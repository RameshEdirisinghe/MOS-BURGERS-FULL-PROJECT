package edu.icet.ecom.controller;

import edu.icet.ecom.dto.Customer;
import edu.icet.ecom.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/customer")
@RequiredArgsConstructor
public class CustomerController {

    final CustomerService customerService;

    @PostMapping("/add")
    public void addItem(@RequestBody Customer customer){
        customerService.addCustomer(customer);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Customer>> getAll(){
        List<Customer> customers = customerService.getAll();
        return ResponseEntity.ok(customers);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteItem(@PathVariable Integer id){
        customerService.delete(id);
    }

    @PutMapping("/update")
    public void updateItem(@RequestBody Customer customer){
        customerService.update(customer);
    }

    @GetMapping("/search-id/{id}")
    public ResponseEntity<Customer> findbyId(@PathVariable Integer id){
        return  ResponseEntity.ok( customerService.findById(id));
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getCount(){
        Long count = customerService.getCount();
        return ResponseEntity.ok(count);
    }
}
