import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-extensions',
  imports: [CommonModule],
  templateUrl: './extensions.html',
  styleUrl: './extensions.css',
})
export class Extensions {
  private http = inject(HttpClient);
  extensions: any[] = [];
  ngOnInit(){
this.http.get<any[]>('./assets/data.json').subscribe(data => {
    this.extensions = data;
    console.log(' البيانات اشتغلت:', this.extensions);
  });

  }
  removeEXT(name: string) {
    this.extensions = this.extensions.filter(ext => ext.name !== name);
  }
toggleStatus(ext: any) {
    ext.isActive = !ext.isActive;
  }
};
