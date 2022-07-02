import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NameDialogComponent } from './components/dialog/name.dialog.component';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { SocketService } from './services/socket.service';
import { ToastService } from './modules/toast/toast.service';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  username!: string;
  constructor(
    public dialog: MatDialog,
    private socket: SocketService,
    private toast: ToastService
  ) {}

  @ViewChild('inner') innerEl!: ElementRef;
  @ViewChild('borderTop') borderTop!: ElementRef;
  @ViewChild('borderBottom') borderBottom!: ElementRef;

  ngOnInit(): void {
    // this.toast.show('hello', 'success', 50000);

    this.username = localStorage.getItem('username') || '';
    if (this.username) {
      this.socket.updateProfile({ username: this.username });
      return;
    }
    const dialogRef = this.dialog.open(NameDialogComponent, {
      width: '250px',
      data: { username: this.username },
    });

    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe((result) => {
      this.socket.updateProfile({ username: result });
      localStorage.setItem('username', result);
    });
  }

  doit() {
    this.borderTop.nativeElement.style.transform = 'none';
    this.borderBottom.nativeElement.style.transform = 'none';
    setTimeout(() => {
      this.innerEl.nativeElement.style.display = 'none';
    }, 2000);
  }
}
