import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastOuter!: HTMLElement | null;
  toastInner!: HTMLElement | null;
  toastContent!: HTMLElement | null;
  constructor() {
    this.toastOuter = document.createElement('div');
    this.toastOuter.style.position = 'fixed';
    this.toastOuter.style.bottom = '10px';
    this.toastOuter.style.display = 'flex';
    this.toastOuter.style.justifyContent = 'center';
    this.toastOuter.style.alignItems = 'center';
    this.toastOuter.style.width = '100%';
    this.toastOuter.style.height = '50px';
    this.toastOuter.style.zIndex = '9999';
    this.toastOuter.style.overflow = 'hidden';
    document.body.appendChild(this.toastOuter);
  }

  show(message: string, type: string, timeout: number) {
    this.createToast(message);
    setTimeout(() => {
      (this.toastInner as HTMLElement).style.height = '50px';
    }, 2000);
    setTimeout(() => {
      this.removeToast();
    }, timeout);
  }

  createToast(message: string) {
    this.toastInner = document.createElement('div');

    this.toastInner.style.height = '0';
    this.toastInner.style.overflow = 'hidden';
    this.toastInner.style.display = 'flex';
    this.toastInner.style.justifyContent = 'center';
    this.toastInner.style.alignItems = 'center';
    this.toastInner.style.transition = 'height 5s';

    let innerDiv = document.createElement('div');
    innerDiv.style.width = '85%';
    innerDiv.style.maxWidth = '600px';

    let topBoarder = document.createElement('div');
    topBoarder.style.width = '100%';
    topBoarder.style.borderTop = '1px solid black';
    topBoarder.style.borderBottom = '1px solid black';

    let bottomBorder = topBoarder.cloneNode(true);

    this.toastContent = document.createElement('div');
    this.toastContent.innerText = message;

    innerDiv.appendChild(topBoarder);
    innerDiv.appendChild(this.toastContent);
    innerDiv.appendChild(bottomBorder);
    this.toastInner.appendChild(innerDiv);

    this.toastOuter?.appendChild(this.toastInner);
  }

  removeToast() {
    if (this.toastInner) this.toastInner.remove();
    this.toastInner = null;
    this.toastContent = null;
  }
}
