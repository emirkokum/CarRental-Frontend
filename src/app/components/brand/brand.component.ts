import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Brand } from '../../models/brand';
import { BrandService } from '../../services/brand.service';
import { RouterModule } from '@angular/router';
import { ColorService } from '../../services/color.service';

@Component({
    selector: 'app-brand',
    standalone: true,
    imports: [CommonModule,RouterModule],
    templateUrl: './brand.component.html',
    styleUrl: './brand.component.css',
})
export class BrandComponent implements OnInit {
    brands: Brand[] = [];
    currentBrand : Brand;
    emptyBrand: Brand;

    constructor(private brandService: BrandService,private colorService:ColorService) { }

    ngOnInit(): void {
        this.getBrands();
    }

    getBrands() {
        this.brandService.getBrands().subscribe(response => {
            this.brands = response.data           
        })
    }

    setCurrentBrand(brand:Brand){
        this.currentBrand = brand
    }

    getCurrentBrandClass(brand:Brand){
        if (brand == this.currentBrand) {
            return "list-group-item active"
        }else{
            return "list-group-item"
        }
    }

    getAllBrandClass() {
        if (!this.currentBrand) {
            return "list-group-item active"
        } else {
            return "list-group-item"
        }
    }

    clearCurrentBrand(){
        this.currentBrand = this.emptyBrand;
    }
}
