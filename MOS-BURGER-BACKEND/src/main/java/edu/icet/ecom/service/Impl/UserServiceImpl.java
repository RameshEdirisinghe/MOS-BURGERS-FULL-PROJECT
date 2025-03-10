package edu.icet.ecom.service.Impl;

import edu.icet.ecom.dto.Login;
import edu.icet.ecom.entity.LoginEntity;
import edu.icet.ecom.repository.UserDao;
import edu.icet.ecom.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    @Autowired
    UserDao userDao;
    @Autowired
    ModelMapper modelMapper;

    @Override
    public boolean isValid(Login login) {
        List<LoginEntity> userList = userDao.findByUser(login.getUser());
        System.out.println(login.getUser());
        System.out.println(userList);
        if (userList!=null){
            for(LoginEntity loginEntity:userList) {
                if (login.getPassword().equals(loginEntity.getPassword())){
                    return true;
                }
            }
        }
        return false;
    }
}
