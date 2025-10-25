package com.gupta.fleetops.controllers;


import com.gupta.fleetops.io.ProfileResponse;
import com.gupta.fleetops.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/profile")
public class ProfileActivityController {

    private final ProfileService profileService;

    public ProfileActivityController(ProfileService profileService){
        this.profileService = profileService;
    }



    @GetMapping("/getProfile")
    public ResponseEntity<ProfileResponse> getProfile(){
        ProfileResponse user = profileService.loadUserProfile();
        return ResponseEntity.ok().body(user);
    }


}
