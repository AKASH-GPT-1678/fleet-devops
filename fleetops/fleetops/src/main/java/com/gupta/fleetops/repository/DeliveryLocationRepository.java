package com.gupta.fleetops.repository;


import com.gupta.fleetops.entity.DeliveryLocation;
import org.springframework.data.repository.CrudRepository;
import java.util.List;
import java.util.Optional;

public interface DeliveryLocationRepository extends CrudRepository<DeliveryLocation, String> {

    List<DeliveryLocation> findAll();
    Optional<DeliveryLocation> findByDeliveryId(String deliveryId);
    List<DeliveryLocation> findAllByDeliveryId(String deliveryId);

}