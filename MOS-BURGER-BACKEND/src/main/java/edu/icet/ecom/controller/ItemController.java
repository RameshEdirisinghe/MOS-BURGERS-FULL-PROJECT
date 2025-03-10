package edu.icet.ecom.controller;

import edu.icet.ecom.dto.Item;
import edu.icet.ecom.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/item")
@RequiredArgsConstructor
public class ItemController {

    final ItemService itemService;

    @PostMapping("/add")
    public void addItem(@RequestBody Item item){
        itemService.addItem(item);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Item>> getAll(){
        List<Item> items = itemService.getAll();
        return ResponseEntity.ok(items);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteItem(@PathVariable Integer id){
        itemService.delete(id);
    }

    @PutMapping("/update/{id}")
    public void updateItem(@RequestBody Item item){
        itemService.update(item);
    }

    @GetMapping("/search-name/{name}")
    public ResponseEntity<Item> findbyname(@PathVariable String name){
        return  ResponseEntity.ok( itemService.findById(name));
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getCount(){
        Long count = itemService.getCount();
        return ResponseEntity.ok(count);
    }

}
