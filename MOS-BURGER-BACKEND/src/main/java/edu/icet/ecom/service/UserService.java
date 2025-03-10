package edu.icet.ecom.service;

import edu.icet.ecom.dto.Login;

public interface UserService {

    boolean isValid(Login login);
}
