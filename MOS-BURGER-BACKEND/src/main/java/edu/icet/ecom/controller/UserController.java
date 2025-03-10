package edu.icet.ecom.controller;

import edu.icet.ecom.dto.Login;
import edu.icet.ecom.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<Boolean> login(@RequestBody Login login){
        System.out.println(login);
        return ResponseEntity.ok(userService.isValid(login));
    }
}
