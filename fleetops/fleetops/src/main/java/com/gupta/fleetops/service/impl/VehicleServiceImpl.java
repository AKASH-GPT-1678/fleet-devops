package com.gupta.fleetops.service.impl;

import com.gupta.fleetops.entity.Company;
import com.gupta.fleetops.entity.DeliverStatus;
import com.gupta.fleetops.entity.User;
import com.gupta.fleetops.entity.Vehicle;
import com.gupta.fleetops.exceptions.AdminPasswordNotMatch;
import com.gupta.fleetops.io.VehicleDetailsResponse;
import com.gupta.fleetops.io.VehicleRequest;
import com.gupta.fleetops.io.VehicleResponseDTO;
import com.gupta.fleetops.repository.CompanyRepository;
import com.gupta.fleetops.repository.UserRepository;
import com.gupta.fleetops.repository.VehicleRepository;
import com.gupta.fleetops.service.VehicleService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class VehicleServiceImpl implements VehicleService {
    private final CompanyRepository companyRepository;
    private final VehicleRepository vehicleRepository;
    private final PasswordEncoder  passwordEncoder;
    private final UserRepository userRepository;
    public VehicleServiceImpl(UserRepository userRepository, CompanyRepository companyRepository, VehicleRepository vehicleRepository, PasswordEncoder passwordEncoder) {

        this.companyRepository = companyRepository;
        this.vehicleRepository = vehicleRepository;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }
    @Override
    public VehicleResponseDTO addVehicleToCompany(VehicleRequest vehicleRequest) {
        Company company = companyRepository.findById(vehicleRequest.getCompanyId())
                .orElseThrow(()-> new NoSuchElementException("No Such Company found"))

                ;

        Vehicle newVehicle = new Vehicle();


        if (!passwordEncoder.matches(vehicleRequest.getAdminPassword(), company.getAdminPassword())) {
            throw new AdminPasswordNotMatch("Admin password does not match.");
        }



        newVehicle.setVehicleNumber(vehicleRequest.getVehicleNumber());
        newVehicle.setModel(vehicleRequest.getModel());
        newVehicle.setFeatures(vehicleRequest.getFeatures());
        newVehicle.setPricePerDay(vehicleRequest.getPricePerDay());

        newVehicle.setFuelType(vehicleRequest.getFuelType());
        newVehicle.setCapacityInKg(vehicleRequest.getCapacityInKg());
        newVehicle.setStatus(DeliverStatus.AVAILABLE);
        newVehicle.setRegistrationDate(vehicleRequest.getRegistrationDate());
        newVehicle.setDescription(vehicleRequest.getDescription());
        newVehicle.setCompany(company);
        Vehicle savedVehicle = vehicleRepository.save(newVehicle);
        company.setVehiclesOwned(company.getVehiclesOwned() + 1);
        companyRepository.save(company);

        VehicleResponseDTO responseDTO = new VehicleResponseDTO();
        responseDTO.setId(savedVehicle.getId());
        responseDTO.setCompanyName(company.getName());
        responseDTO.setVehicleNumber(newVehicle.getVehicleNumber());
        responseDTO.setStatus(true);
        responseDTO.setMessage("Vehicle created Successfully");




        return responseDTO;
    }

    @Override
    public List<VehicleDetailsResponse> getVehiclesByCompanyId(UUID companyId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();

        Optional<User> user = Optional.ofNullable(userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new NoSuchElementException("Not Found")))


                ;

        Optional<Company> company = companyRepository.findById(companyId);
        if(company.isEmpty()){
            throw new NoSuchElementException("No such Company found");
        }

        if (user.isPresent() && company.isPresent() ) {
            List<Vehicle> vehicles = company.get().getVehicles();
            return vehicles.stream()
                    .map(vehicle -> new VehicleDetailsResponse(
                            vehicle.getId(),
                            vehicle.getVehicleNumber(),
                            vehicle.getType(),
                            vehicle.getModel(),
                            vehicle.getCapacityInKg(),
                            vehicle.getFuelType(),
                            vehicle.getStatus(),
                            vehicle.getRegistrationDate(),
                            vehicle.getPricePerDay(),
                            vehicle.getDescription(),
                            vehicle.getFeatures()

                    ))
                    .collect(Collectors.toList());




        }else {
            throw new NoSuchElementException("User is not a member of this company");
        }


    }

    @Override
    public String uploadVehicleImage(UUID vehicleId, String image) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();


        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new NoSuchElementException("User not found: " + authentication.getName()));

        Company company = user.getCompany();

        if(company == null){
            throw new NoSuchElementException("No such Company found");
        }

        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new NoSuchElementException("Vehicle not found: " +  vehicleId + " for user ID: " + user.getUsername()));

        vehicle.setImage(image);
        vehicleRepository.save(vehicle);



        return "Uploaded";
    }
}
