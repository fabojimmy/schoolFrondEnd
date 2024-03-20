package com.demoperson.school.POJO;

import java.io.Serializable;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@DynamicInsert
@DynamicUpdate
@Table
public class College implements Serializable {

    private static final long serialVersionUID=1L;

    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    private Integer id;

    @Column(name="nom")
    private String nom;

    @Column(name = "adresse")
    private String adresse;
    
    @Column(name="email")
    private String email;

    @Column(name = "createdBy")
    private String createdBy;
}
