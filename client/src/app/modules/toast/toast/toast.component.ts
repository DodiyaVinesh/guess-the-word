import { Component, Input, OnInit } from '@angular/core';
import { ToastService } from 'src/app/modules/toast/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements OnInit {
  constructor(private toastService: ToastService) {}
  @Input('timeout') timeout!: number;
  @Input('message') message!: string;
  @Input('type') type!: string;

  ngOnInit(): void {}
}
