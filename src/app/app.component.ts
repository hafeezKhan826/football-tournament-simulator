import { Component } from '@angular/core';
import { TeamsService } from "src/app/teams.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  winner: {};
  dividedTeams: any = [];
  saveMyArray: any = [];
  title = 'Football Tournament Simulator';
  array = [];
  constructor(private teamService: TeamsService) {
    this.getTeams();
  }

  getTeams() {
    this.teamService.getTeams().subscribe((array: any) => {
      this.array = array;
      this.divideTeams(array)
    });
  }

  chunks(array, chunkSize) {

    let results = [];
    while (array.length > 0) {
      results.push(array.splice(0, chunkSize))
    }
    return results;
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  startTournament() {
    let winners = [];
    this.dividedTeams.forEach((chunks, index) => {
      let winner = chunks.map((chunk) => chunk[Math.floor(Math.random() * chunk.length)]);
      winners = winners.concat(winner);
    });
    this.divideTeams(winners);

    const interval = setInterval(() => {
      if (this.dividedTeams.length > 1) {
        this.startTournament();
      } else if (this.dividedTeams.length === 1) {
        if (this.dividedTeams[0][0].length === 1) {
          this.winner = this.dividedTeams[0][0];
          this.dividedTeams = [];
          clearInterval(interval);
        } else {
          this.startTournament();
        }
      }
    }, 3000);



  }
  divideTeams(array) {
    const shuffledChunks = this.chunks(this.shuffle(array), 2);
    const splitShuffledChunks = this.chunks(shuffledChunks, Math.ceil(shuffledChunks.length / 2));
    this.dividedTeams = splitShuffledChunks;
    console.log('Exiting successfully:', this.dividedTeams);
  }
  resetTeams() {
    this.getTeams();
  }
}
