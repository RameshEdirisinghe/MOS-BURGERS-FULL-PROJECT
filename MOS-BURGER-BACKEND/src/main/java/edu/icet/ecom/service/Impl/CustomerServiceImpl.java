package edu.icet.ecom.service.Impl;

import edu.icet.ecom.dto.Customer;
import edu.icet.ecom.entity.CustomerEntity;
import edu.icet.ecom.repository.CustomerDao;
import edu.icet.ecom.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    ModelMapper modelMapper = new ModelMapper();
    final CustomerDao customerDao;

    @Override
    public void addCustomer(Customer customer) {
        customerDao.save(modelMapper.map(customer, CustomerEntity.class));
    }

    @Override
    public List<Customer> getAll() {
        List<CustomerEntity> customerEntities = customerDao.findAll();
        List<Customer> customers = new ArrayList<>();

        customerEntities.forEach(customerEntity -> {
            customers.add(modelMapper.map(customerEntity, Customer.class));
        });
        return customers;
    }

    @Override
    public void delete(Integer id) {
        customerDao.deleteById(id);
    }

    @Override
    public void update(Customer customer) {
        customerDao.save(modelMapper.map(customer, CustomerEntity.class));
    }

    @Override
    public Customer findById(Integer id) {
        return modelMapper.map(customerDao.findById(id), Customer.class);
    }

    @Override
    public long getCount() {
        return customerDao.count();
    }


}
