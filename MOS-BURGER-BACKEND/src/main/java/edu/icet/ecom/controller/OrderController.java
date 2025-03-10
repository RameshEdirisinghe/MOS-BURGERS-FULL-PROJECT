package edu.icet.ecom.controller;

import edu.icet.ecom.dto.Item;
import edu.icet.ecom.dto.Order;
import edu.icet.ecom.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Or;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderController {

    final OrderService orderService;

    @PostMapping("/place-order")
    public void placeOrder(@RequestBody Order order){
        orderService.placeOrder(order);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAllOrders(){

        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getCount(){
        Long count = orderService.getCount();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/getFive")
    public ResponseEntity<List<Order>> getFive(){
        List<Order> fiveOrders = orderService.getFiveOrders();
        System.out.println(fiveOrders);
        return ResponseEntity.ok(fiveOrders);
    }
}
