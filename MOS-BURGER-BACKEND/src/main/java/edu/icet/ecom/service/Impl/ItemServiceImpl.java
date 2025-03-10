package edu.icet.ecom.service.Impl;

import edu.icet.ecom.dto.Item;
import edu.icet.ecom.entity.ItemEntity;
import edu.icet.ecom.repository.ItemDao;
import edu.icet.ecom.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service

public class ItemServiceImpl implements ItemService {

    @Autowired
    ModelMapper modelMapper;
    @Autowired
    ItemDao itemDao;

    @Override
    public void addItem(Item item) {
        itemDao.save(modelMapper.map(item, ItemEntity.class));
    }

    @Override
    public List<Item> getAll() {
        List<ItemEntity> itemEntities = itemDao.findAll();
        List<Item> items = new ArrayList<>();
        itemEntities.forEach(itemEntity -> {
            items.add(modelMapper.map(itemEntity, Item.class));
        });
        return items;
    }

    @Override
    public void delete(Integer id) {
        itemDao.deleteById(id);
    }

    @Override
    public void update(Item item) {
        itemDao.save(modelMapper.map(item, ItemEntity.class));
    }

    @Override
    public Item findById(String name) {
        return modelMapper.map(itemDao.findByItemName(name), Item.class);
    }

    @Override
    public Long getCount() {
        return  itemDao.count();
    }
}
