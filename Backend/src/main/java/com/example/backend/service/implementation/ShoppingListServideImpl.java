package com.example.backend.service.implementation;

import com.example.backend.entity.*;
import com.example.backend.repository.OrderRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.CartProductRepository;
import com.example.backend.repository.ShoppingListRepository;
import com.example.backend.service.ShoppingListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;
@Service
public class ShoppingListServideImpl implements ShoppingListService {

    @Autowired
    private ShoppingListRepository shoppingListRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CartProductRepository shoppingListProductRepository;
    @Autowired
    private OrderRepository orderRepository;


    @Override
    public ShoppingList save(ShoppingList dto) throws ExecutionException, InterruptedException {
        return shoppingListRepository.save(dto);
    }

    @Override
    public ShoppingList findById(String id) throws ExecutionException, InterruptedException {
        return shoppingListRepository.findUserShoppingList(id);
    }

    @Override
    public String deleteById(String id) throws ExecutionException, InterruptedException {
        return shoppingListRepository.deleteById(id);
    }

    @Override
    public List<ShoppingList> findAll() throws ExecutionException, InterruptedException {
        return shoppingListRepository.findAll();
    }

    @Override
    public ShoppingList updateById(ShoppingList dto) throws ExecutionException, InterruptedException {
        return shoppingListRepository.updateById(dto);
    }

    @Override
    public String addProduct(String productId, String userId, int quantity) throws ExecutionException, InterruptedException {
        ShoppingList shoppingList = shoppingListRepository.findUserShoppingList(userId);
        Product product = productRepository.findById(productId);



        if(shoppingList == null) {  // if user don't have a shopping list, one will be created and the ShoppingListProduct created will be added
            CartProduct shoppingListProduct = new CartProduct();
            shoppingListProduct.setBrand(product.getBrand());
            shoppingListProduct.setName(product.getName());
            shoppingListProduct.setPrice(product.getPrice());
            shoppingListProduct.setWeight(product.getWeight());
            shoppingListProduct.setQuantity(quantity);
            shoppingListProduct.setHasExpirationDate(product.isHasExpirationDate());
            shoppingListProduct.setMeasure(product.getMeasure());
            shoppingListProductRepository.save(shoppingListProduct);
            List<CartProduct> shoppingListProducts = new ArrayList<>();
            shoppingListProducts.add(shoppingListProduct);

            ShoppingList shoppingList1 = new ShoppingList();
            shoppingList1.setUserId(userId);
            shoppingList1.setProducts(shoppingListProducts);
            shoppingList1.setTotal(shoppingListProduct.getPrice());
            shoppingListRepository.save(shoppingList1);
            return "Shopping list created and product added successfully";

        } else {
            List<CartProduct> shoppingListProducts = shoppingList.getProducts();
            boolean alreadyPresent = false;
            for(CartProduct p : shoppingListProducts) {
                if(p.getName().equals(product.getName())) {
                    alreadyPresent = true;
                }
            }
            if(alreadyPresent) {
                return "Shopping list already contains this product";
            }
            CartProduct shoppingListProduct = new CartProduct();
            shoppingListProduct.setBrand(product.getBrand());
            shoppingListProduct.setName(product.getName());
            shoppingListProduct.setPrice(product.getPrice());
            shoppingListProduct.setWeight(product.getWeight());
            shoppingListProduct.setQuantity(quantity);
            shoppingListProduct.setHasExpirationDate(product.isHasExpirationDate());
            shoppingListProduct.setMeasure(product.getMeasure());
            shoppingListProductRepository.save(shoppingListProduct);
            shoppingListProducts.add(shoppingListProduct);
            shoppingList.setProducts(shoppingListProducts);
            shoppingList.setTotal(shoppingList.getTotal() + shoppingListProduct.getPrice());
            shoppingListRepository.updateById(shoppingList);
            return "Shopping list already exists and product added successfully";
        }
    }

    @Override
    public String removeProduct(String productId, String userId) throws ExecutionException, InterruptedException {
        ShoppingList shoppingList = shoppingListRepository.findUserShoppingList(userId);
        if(shoppingList == null) {
            return "Shopping list is null";
        } else {
            List<CartProduct> products = shoppingList.getProducts();
            CartProduct shoppingListProduct = shoppingListProductRepository.findById(productId);
            shoppingList.setTotal(shoppingList.getTotal()-shoppingListProduct.getPrice());
            products.remove(shoppingListProduct);
            shoppingList.setProducts(products);
            shoppingListRepository.updateById(shoppingList);
            shoppingListProductRepository.deleteById(productId);
            return "Product removed from shopping list";
        }
    }

    @Override
    public String updateProductQuantity(String productId, String userId, int quantity) throws ExecutionException, InterruptedException {
        ShoppingList shoppingList = shoppingListRepository.findUserShoppingList(userId);
        if(shoppingList == null) {
            return "Shopping list is null";
        } else {
            List<CartProduct> products = shoppingList.getProducts();
            CartProduct shoppingListProduct = shoppingListProductRepository.findById(productId);
            shoppingListProduct.setQuantity(quantity);
            double deltaTotal = 0;
            for(CartProduct p : products) {
                if(p.getId().equals(productId)) {
                    deltaTotal = (quantity- p.getQuantity() ) * p.getPrice();
                    p.setQuantity(quantity);
                }
            }
            shoppingList.setTotal(shoppingList.getTotal() + deltaTotal);
            shoppingList.setProducts(products);
            shoppingListRepository.updateById(shoppingList);
            shoppingListProductRepository.updateById(shoppingListProduct);
            return "Quantity updated successfully";

        }
    }

    @Override
    public String clear(String userId) throws ExecutionException, InterruptedException {
        ShoppingList shoppingList = shoppingListRepository.findUserShoppingList(userId);
        if(shoppingList == null) {
            return "Shopping list is null";
        } else {
            List<CartProduct> shoppingListProducts = shoppingList.getProducts();
            for(CartProduct p : shoppingListProducts) {
                shoppingListProductRepository.deleteById(p.getId());
            }
            shoppingListProducts.clear();
            shoppingList.setProducts(shoppingListProducts);
            shoppingList.setTotal(0);
            shoppingListRepository.updateById(shoppingList);
            return "Shopping list cleared";
        }
    }

    @Override
    public String finalizeOrder(String userId) throws ExecutionException, InterruptedException {
        ShoppingList shoppingList = shoppingListRepository.findUserShoppingList(userId);
        if(shoppingList.getProducts().isEmpty()){
            return("Shopping cart empty. No order created");
        } else {
            Order order = new Order();
            order.setUserId(userId);
            order.setProducts(shoppingList.getProducts());
            order.setDate(new Date());
            order.setStatus(Status.PAID);
            order.setTotal(shoppingList.getTotal() + 14.99);
            orderRepository.save(order);
            shoppingList.setProducts(new ArrayList<>());
            shoppingList.setTotal(0);
            shoppingListRepository.updateById(shoppingList);
            return "Order has been received";
        }
    }
}
