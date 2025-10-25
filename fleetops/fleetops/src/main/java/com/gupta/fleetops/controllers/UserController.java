package com.gupta.fleetops.controllers;


import com.gupta.fleetops.entity.User;
import com.gupta.fleetops.io.AuthRequest;
import com.gupta.fleetops.io.AuthResponse;
import com.gupta.fleetops.io.TokenResponseDTO;
import com.gupta.fleetops.repository.UserRepository;
import com.gupta.fleetops.service.UserInfoService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/auth")
public class UserController {

    private final UserInfoService userInfoService;



    private UserRepository userRepository;

    public UserController(UserInfoService userInfoService, UserRepository userRepository){
        this.userInfoService = userInfoService;
        this.userRepository = userRepository;
    }



    @GetMapping("/welcome")
    private String welcome(){
        return "Welcome to World";

    }

    @PostMapping("/adduser")
    public User addNewUser(@RequestBody User userInfo) {
        return userInfoService.createUser(userInfo);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginUseer(@RequestBody AuthRequest authRequest){
        AuthResponse isVerifed = userInfoService.authenticateUser(authRequest);
        return ResponseEntity.ok().body(isVerifed);
    }


    @GetMapping("checkToken")
    public TokenResponseDTO checkToken(){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
   
        TokenResponseDTO response = new TokenResponseDTO();

        if (authentication.isAuthenticated()){
            Optional<User> user = userRepository.findByEmail(authentication.getName());

            boolean subscriptionStatus = user.get().isPremium();



            response.setMessage("Verified User");
            response.setStatus(true);
            response.setSubscription(subscriptionStatus);


            return response;
        }
        else {
            response.setMessage("Not Verified User");
            response.setStatus(false);
            return response;


        }
    }


    @PutMapping("/addSubscription")
    public String updateSubscriptionStatus(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        System.out.println(("premium"));
        Optional<User> user = userRepository.findByEmail(userEmail);
        user.get().setPremium(true);
        userRepository.save(user.get());
        return "Subscription Status Updated";
    }





}
