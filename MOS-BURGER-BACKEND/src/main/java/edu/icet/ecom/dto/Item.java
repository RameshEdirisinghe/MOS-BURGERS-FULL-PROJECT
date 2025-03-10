package edu.icet.ecom.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Item {
    private Integer id;
    private String itemName;
    private String des;
    private String imgUrl;
    private Double price;
    private Integer qty;
}
