import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

export interface DisqusComment {
  id: number;
  name: string;
}
export interface DisqusReady {
  height: number;
}
@Component({
  selector: 'app-disqus',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './disqus.component.html',
  styleUrls: ['./disqus.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisqusComponent {
  /** DISQUS options */
  @Input({ required: true }) url!: string;
  @Input({ required: true }) identifier!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) category!: string;
  @Input({ required: true }) language!: string;
  @Input({ required: true }) shortname!: string;

  get DISQUS(): any {
    return this._document.defaultView.DISQUS;
  }

  get disqus_config(): any {
    return this._document.defaultView.disqus_config;
  }

  set disqus_config(config: any) {
    this._document.defaultView.disqus_config = config;
  }

  @Output() newComment = new EventEmitter<DisqusComment>(true);
  @Output() ready = new EventEmitter<DisqusReady>(true);
  @Output() paginate = new EventEmitter<any>(true);

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    @Inject(DOCUMENT) private _document: any,
  ) {}

  ngOnChanges() {
    if (!this.DISQUS) {
      this.addDisqusScript();
    } else {
      this.reset();
    }
  }

  addDisqusScript() {
    this.disqus_config = this.getConfig();
    const disqusScript = this.renderer.createElement('script');
    disqusScript.src = `//${this.shortname}.disqus.com/embed.js`;
    disqusScript.async = true;
    disqusScript.type = 'text/javascript';
    this.renderer.setAttribute(disqusScript, 'data-timestamp', new Date().getTime().toString());
    this.renderer.appendChild(this.el.nativeElement, disqusScript);
  }

  reset() {
    this.DISQUS.reset({
      reload: true,
      config: this.getConfig(),
    });
  }

  getConfig() {
    const self = this;
    return function (this: any) {
      this.page.identifier = self.identifier;
      this.page.url = self.validateUrl(self.url);
      this.page.title = self.title;
      this.category_id = self.category;
      this.language = self.language;
      this.callbacks.onNewComment = [(e: any) => self.newComment.emit(e)];
      this.callbacks.onReady = [(e: any) => self.ready.emit(e)];
      this.callbacks.onPaginate = [(e: any) => self.paginate.emit(e)];
    };
  }

  validateUrl(url: string) {
    if (url) {
      const r = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

      if (r.test(url)) {
        return url;
      } else {
        console.warn('[Disqus]: Invalid URL');
      }
    }
    return undefined;
  }
}
