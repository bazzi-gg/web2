function KartbodyNotFound(event: Event, replaceImageUrl: string): void {
  ;(
    event.target as HTMLImageElement
  ).src = require('~/static/img/unknown_kartbody.png')
}
function CharacterNotFound(event: Event): void {
  ;(
    event.target as HTMLImageElement
  ).src = require('~/static/img/unknown_character.png')
}
export { KartbodyNotFound, CharacterNotFound }
