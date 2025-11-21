import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-header-host' }
})
export class HeaderComponent {
  readonly userName = input<string>('John Doe');
  readonly userLabel = computed(() => `Signed in as ${this.userName()}`);
  readonly initials = computed(() => this.userName().split(/\s+/).map(p => p[0]).join('').slice(0,2).toUpperCase());
  // Dynamic SVG avatar rendered as data URI to satisfy accessibility guidance using an actual <img> element.
  readonly avatarDataUri = computed(() => {
    const letters = this.initials();
    // Smaller 40x40 avatar matching header height with centered text
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' role='img' aria-label='${this.userLabel()}'><rect width='100%' height='100%' fill='#2E3A4A'/><text x='50%' y='56%' font-size='16' fill='#FFFFFF' text-anchor='middle' font-family='Arial,sans-serif'>${letters}</text></svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  });
}
