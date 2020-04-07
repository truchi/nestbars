import { promisify } from 'util'
import {
  //
  readFile as _readFile,
  // readdir as _readDir,
} from 'fs'

export const readFile = (file: string) =>
  promisify(_readFile)(file, 'utf8').then(content => ({ file, content }))

// export const readDir = promisify(_readDir)

// export const readDirFiles = async (dir: string) =>
//   readDir(dir).then(files =>
//     Promise.all(
//       files.map(file =>
//         readFile(dir + file).then(content => ({ [file]: content })),
//       ),
//     ).then(arr => Object.assign.apply(null, arr)),
//   )
