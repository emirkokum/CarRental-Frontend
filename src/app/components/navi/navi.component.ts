import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navi',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navi.component.html',
  styleUrl: './navi.component.css'
})
export class NaviComponent implements OnInit {
  isAuthenticated: boolean
  userName: string[] = []
  userEmail = this.authService.getUserEmailFromToken()


  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getIsAuthenticated()
    this.authService.getUserEmailFromToken()
    this.getUserNameByMail(this.userEmail)
  }

  getIsAuthenticated() {
    this.isAuthenticated = this.authService.isAuthenticated()
  }

  getUserNameByMail(email: string) {
    this.userService.getUserNameByMail(email).subscribe(response => {
      this.userName = response.data
      console.log(this.userName);
    })
  }

  logOut() {
    localStorage.clear()
    this.router.navigate([""])
    location.reload()
  }

}
