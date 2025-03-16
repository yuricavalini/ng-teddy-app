import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LoadingIndicatorComponent } from '../../shared/components/loading-indicator.component';
import { LoadingService } from '../../shared/services/loading.service';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    LoadingIndicatorComponent,
  ],
  template: `<app-header />
    <main class="center-page-content">
      <router-outlet />
    </main>
    <app-sidebar />

    @if (loading$ | async) {
      <app-loading-indicator />
    } `,

  styles: [
    `
      main {
        background-color: #f5f5f5;
        margin-top: 30px;
        padding: 0 20px;
      }
    `,
  ],
})
export class ShellComponent implements AfterViewInit {
  private readonly loadingService = inject(LoadingService);
  public readonly loading$ = this.loadingService.loading$;
  private readonly cdr = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {
    this.loading$.subscribe(() => {
      this.cdr.detectChanges();
    });
  }
}
