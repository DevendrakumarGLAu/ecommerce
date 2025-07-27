import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  imports: [NgIf],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent implements OnInit, OnDestroy {
  isLoading = false;
  private subscription!: Subscription;
constructor(public loader: LoaderService) {}
ngOnInit(): void {
    this.subscription = this.loader.isLoading.subscribe((value) => {
      this.isLoading = value;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
