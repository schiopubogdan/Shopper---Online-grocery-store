package com.example.backend;

import com.example.backend.firebase.FirebaseInitialization;
import com.example.backend.models.Category;
import com.example.backend.models.Measure;
import com.example.backend.models.Product;
import com.example.backend.service.ProductService;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.concurrent.ExecutionException;
import java.util.logging.Logger;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@ExtendWith(SpringExtension.class)
@SpringBootTest
@Import(FirebaseInitialization.class)
public class ProductTest {
    Logger LOG = Logger.getLogger(ProductTest.class.getName());

    @Autowired
    private ProductService productService;
    private Product MOCKED_PRODUCT;
    private String SAVED_PRODUCT_ID;
    private String UPDATED_PRODUCT_ID;

    @BeforeEach
    public void initMockedData() throws ExecutionException, InterruptedException {
        LOG.info("INITIALIZATION");
        MOCKED_PRODUCT = new Product(null,"Produs_Test","Brand_Test","Description Test",3.8,5.0,1,false, Category.ALCOHOL, Measure.KG,"url_test");
        Product productSaved = productService.save(MOCKED_PRODUCT);
        MOCKED_PRODUCT.setId(productSaved.getId());
        Thread.sleep(1000);
    }

    @AfterEach
    public void teardown() throws ExecutionException, InterruptedException {
        LOG.info("CLEANING");
        Thread.sleep(1000);
        //productService.deleteById(MOCKED_PRODUCT.getId());
    }
    @Test
    @Order(1)
    public void insertProductTest() throws ExecutionException, InterruptedException {
        LOG.info("TEST INSERT");
        MOCKED_PRODUCT = new Product(null,"Produs_Test","Brand_Test","Description Test",3.8,5.0,1,false, Category.ALCOHOL, Measure.KG,"url_test");
        Product savedProduct = productService.save(MOCKED_PRODUCT);
        SAVED_PRODUCT_ID = savedProduct.getId();
        MOCKED_PRODUCT.setId(SAVED_PRODUCT_ID);
        Assertions.assertEquals(true, MOCKED_PRODUCT.equals(savedProduct));
    }

    @Test
    @Order(2)
    public void updateProductTest() throws ExecutionException, InterruptedException {
        LOG.info("TEST UPDATE");
        Product product = productService.findById(MOCKED_PRODUCT.getId());
        product.setPrice(10);
        productService.updateById(product);
        Product updatedProduct = productService.findById(MOCKED_PRODUCT.getId());
        Assertions.assertTrue(product.equals(updatedProduct));
    }

    @Test
    @Order(3)
    public  void deleteProductTest() throws ExecutionException, InterruptedException {
        LOG.info("TEST DELETE");
        productService.deleteById(MOCKED_PRODUCT.getId());
        Product product = productService.findById(MOCKED_PRODUCT.getId());
        Assertions.assertNull(product);
    }

}
