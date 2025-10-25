package com.gupta.fleetops.service.impl;


import com.gupta.fleetops.entity.Company;
import com.gupta.fleetops.entity.Delivery;
import com.gupta.fleetops.entity.DeliveryStatus;
import com.gupta.fleetops.entity.User;
import com.gupta.fleetops.exceptions.NotPremiumUserException;
import com.gupta.fleetops.io.CompanyDTO;
import com.gupta.fleetops.io.CompanyRequest;
import com.gupta.fleetops.io.CompanyResponse;
import com.gupta.fleetops.repository.CompanyRepository;
import com.gupta.fleetops.repository.DeliveryRepository;
import com.gupta.fleetops.repository.UserRepository;
import com.gupta.fleetops.service.CompanyService;
import jakarta.transaction.Transactional;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class CompanyServiceImpl implements CompanyService {

    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;
    private final DeliveryRepository deliveryRepository;

    public CompanyServiceImpl(UserRepository userRepository, CompanyRepository companyRepository, PasswordEncoder passwordEncoder, DeliveryRepository deliveryRepository){
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
        this.passwordEncoder = passwordEncoder;
        this.deliveryRepository = deliveryRepository;
    }


    @Override
    @Transactional
    public CompanyResponse createCompany(CompanyRequest companyRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Fetch authenticated user
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new NoSuchElementException("User not found: " + authentication.getName()));

        // Check if user already has a company and is not premium
        if (user.getCompany() != null ) {
            throw new NotPremiumUserException("One User Can create just one Company", false);
        }


        Company newCompany = new Company();
        newCompany.setName(companyRequest.getName());
        newCompany.setAddress(companyRequest.getAddress());
        newCompany.setType(companyRequest.getType());
        newCompany.setAdminEmail(authentication.getName());

        String encodedPassword = passwordEncoder.encode(companyRequest.getAdminPassword());
        newCompany.setAdminPassword(encodedPassword);
        newCompany.setCreatedAt(LocalDate.now());
        newCompany.setPremium(false); // or true if premium applies

        // Step 1: Link both sides of the relationship
        newCompany.setUser(user); // company owns user reference
        user.setCompany(newCompany); // user owns company reference


        companyRepository.save(newCompany);

//
        userRepository.save(user);

        CompanyResponse companyResponse = new CompanyResponse();
        companyResponse.setName(newCompany.getName());
        companyResponse.setStatus(true);
        companyResponse.setCompanyId(newCompany.getId());
        return companyResponse;
    }


    @Override
    public CompanyResponse getAllCompaniesByUser() {
        // 1. Get logged-in user email
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();





        // 2. Fetch user from repository
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NoSuchElementException("User not found"));

        Company company = user.getCompany();
        CompanyResponse companyResponse = new CompanyResponse();
        if(company == null){
            System.out.println("Company is null");
            throw new NoSuchElementException("No such Company found");
        }

        companyResponse.setName(company.getName());
        companyResponse.setStatus(true);
        companyResponse.setCompanyId(company.getId());

        return companyResponse;
    }

    @Override
    public CompanyDTO getCompanyById() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new NoSuchElementException("User not found: " + authentication.getName()));

                ;

        Company company = user.getCompany();
        if(company == null){
            CompanyDTO emptyCompany = new CompanyDTO();
            return emptyCompany;
        }

        List<Delivery> deliveries = deliveryRepository.findByCompany_Id(company.getId());

       Integer pendingDeliveries = 0;

       for(Delivery delivery : deliveries){
           if(delivery.getStatus().equals(DeliveryStatus.PENDING)){
               pendingDeliveries++;
           }
       }





        CompanyDTO dto = CompanyDTO.builder()
                .id(company.getId())
                .name(company.getName())
                .address(company.getAddress())
                .type(company.getType())
                .adminEmail(company.getAdminEmail())
                .vehiclesOwned(company.getVehicles().size())
                .driversOwned(company.getDriversOwned())
                .totalDeliveries(company.getTotalDeliveries())
                .uniqueClients(company.getUniqueClients())
                .pendingDeliveries(pendingDeliveries)
                .averageDeliveryTime(company.getAverageDeliveryTime())
                .customerSatisfaction(company.getCustomerSatisfaction())
                .createdAt(company.getCreatedAt())
                .isPremium(company.isPremium())
                .build();


        return dto;
    }


}
