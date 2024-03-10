import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  title = 'Logsquare';

  constructor(
    public loaderService: LoaderService,
  ) { }
  
}
