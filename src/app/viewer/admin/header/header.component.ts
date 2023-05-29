import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header-two',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponentAdmin implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  isShow= false;
  constructor(private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(){
    const allowedUrls = ['home', 'dashboard','ves', 'taus', 'nhan-vien', 'thongke'];
    // const url = this.route.snapshot.url[0].path;
    // this.isShow = allowedUrls.includes(url);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects.split('/')[1];
        this.isShow = allowedUrls.includes(url);
      }
    });
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
}
