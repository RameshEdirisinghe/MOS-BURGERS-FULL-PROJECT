package edu.icet.ecom.service;

import edu.icet.ecom.dto.Customer;
import edu.icet.ecom.dto.Item;

import java.util.List;

public interface CustomerService {

    void addCustomer(Customer customer);
    List<Customer> getAll();
    void delete(Integer id);
    void update(Customer customer);
    Customer findById(Integer id);
    long getCount();
}


