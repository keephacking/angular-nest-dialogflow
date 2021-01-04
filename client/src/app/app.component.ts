import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DfService } from './services/df.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'df-chatbot';
  messages = [
    {
      type: 'user',
      text: "Hi! I'm a bot. What's up?",
    },
  ];
  botForm = new FormGroup({
    text: new FormControl('', Validators.required),
  });

  constructor(private dfService: DfService, private cd: ChangeDetectorRef) {}

  async onSubmit() {
    if (this.botForm.valid) {
      this.botForm.disable();
      let text = this.botForm.get('text')?.value;

      this.messages.push({
        type: 'bot',
        text,
      });

      let response = await this.dfService.query(text).toPromise();

      setTimeout(() => {
        this.messages.push({
          type: 'user',
          text: response,
        });

        this.botForm.reset();
        this.botForm.enable();

        this.cd.markForCheck();
      }, 100);

      console.log('Text', text);
      console.log('Response', response);
    }
  }
}
