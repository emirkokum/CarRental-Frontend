import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { ColorService } from '../../services/color.service';
import { Brand } from '../../models/brand';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Color } from '../../models/color';
import { CarDetailService } from '../../services/cardetail.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-car-filter',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './car-filter.component.html',
	styleUrl: './car-filter.component.css'
})
export class CarFilterComponent implements OnInit {
	currentBrand: Brand;
	brands: Brand[] = []
	emptyBrand: Brand;
	colors: Color[] = []
	currentColor: Color;
	emptyColor: Color;

	routeLink = "/cars/"


	constructor(private toastr: ToastrService, private activatedRoute: ActivatedRoute, private carDetailService: CarDetailService, private brandService: BrandService, private colorService: ColorService) { }

	ngOnInit(): void {
		this.getBrands()
		this.getColors()
		this.changeRouterLink()
	}

	ChangeBrand(event) {
		this.currentBrand = event.target.value
	}

	ChangeColor(event) {
		this.currentColor = event.target.value
	}

	getBrands() {
		this.brandService.getBrands().subscribe(response => {
			this.brands = response.data
		})
	}

	setCurrentBrand(brand: Brand) {
		this.currentBrand = brand
	}


	getAllBrandClass() {
		if (!this.currentBrand) {
			return "list-group-item active"
		} else {
			return "list-group-item"
		}
	}

	clearCurrentBrand() {
		this.currentBrand = this.emptyBrand;
	}

	getColors() {
		this.colorService.getColors().subscribe(response => {
			this.colors = response.data
		})
	}


	setCurrentColor(color: Color) {
		this.currentColor = color;
	}


	getAllColorClass() {
		if (!this.currentColor) {
			return "list-group-item active"
		} else {
			return "list-group-item"
		}
	}

	clearCurrentColor() {
		this.currentColor = this.emptyColor;
	}

	changeRouterLink() {
		if (this.currentBrand && this.currentColor) {
			this.routeLink = "/cars/brand/" + this.currentBrand + "/color/" + this.currentColor
			return this.routeLink
		} else if (this.currentBrand && !this.currentColor) {
			this.routeLink = "/cars/brand/" + this.currentBrand
			return this.routeLink
		} else if (this.currentColor && !this.currentBrand) {
			this.routeLink = "/cars/color/" + this.currentColor
			return this.routeLink
		} else {
			return this.routeLink
		}
	}

}
