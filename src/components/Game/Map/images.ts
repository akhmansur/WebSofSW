import bg_d from '../../../assets/background_d.png';
import bg_l from '../../../assets/background_l.png';

import d0000_d from '../../../assets/d0000_d.png';
import d0000_l from '../../../assets/d0000_l.png';
import d0001_d from '../../../assets/d0001_d.png';
import d0001_l from '../../../assets/d0001_l.png';
import d0010_d from '../../../assets/d0010_d.png';
import d0010_l from '../../../assets/d0010_l.png';
import d0011_d from '../../../assets/d0011_d.png';
import d0011_l from '../../../assets/d0011_l.png';
import d0100_d from '../../../assets/d0100_d.png';
import d0100_l from '../../../assets/d0100_l.png';
import d0101_d from '../../../assets/d0101_d.png';
import d0101_l from '../../../assets/d0101_l.png';
import d0110_d from '../../../assets/d0110_d.png';
import d0110_l from '../../../assets/d0110_l.png';
import d0111_d from '../../../assets/d0111_d.png';
import d0111_l from '../../../assets/d0111_l.png';
import d1000_d from '../../../assets/d1000_d.png';
import d1001_d from '../../../assets/d1001_d.png';
import d1001_l from '../../../assets/d1001_l.png';
import d1010_d from '../../../assets/d1010_d.png';
import d1010_l from '../../../assets/d1010_l.png';
import d1011_d from '../../../assets/d1011_d.png';
import d1011_l from '../../../assets/d1011_l.png';
import d1100_d from '../../../assets/d1100_d.png';
import d1100_l from '../../../assets/d1100_l.png';
import d1101_d from '../../../assets/d1101_d.png';
import d1101_l from '../../../assets/d1101_l.png';
import d1110_d from '../../../assets/d1110_d.png';
import d1110_l from '../../../assets/d1110_l.png';
import d1111_d from '../../../assets/d1111_d.png';
import d1111_l from '../../../assets/d1111_l.png';
import e from '../../../assets/e.png';
import gmBg from '../../../assets/gmBg.jpg';
import n from '../../../assets/n.png';
import ref from '../../../assets/ref.png';
import s from '../../../assets/s.png';
import w from '../../../assets/w.png';
import s00_d from '../../../assets/s00_d.png';
import s00_l from '../../../assets/s00_l.png';
import s01_d from '../../../assets/s01_d.png';
import s01_l from '../../../assets/s01_l.png';
import s02_d from '../../../assets/s02_d.png';
import s02_l from '../../../assets/s02_l.png';
import s03_d from '../../../assets/s03_d.png';
import s03_l from '../../../assets/s03_l.png';
import s04_d from '../../../assets/s04_d.png';
import s04_l from '../../../assets/s04_l.png';
import s05_d from '../../../assets/s05_d.png';
import s05_l from '../../../assets/s05_l.png';

const images = new Map([
  ['bg_d', bg_d],
  ['bg_l', bg_l],
  ['d0000_d', d0000_d],
  ['d0000_l', d0000_l],
  ['d0001_d', d0001_d],
  ['d0001_l', d0001_l],
  ['d0010_d', d0010_d],
  ['d0010_l', d0010_l],
  ['d0011_d', d0011_d],
  ['d0011_l', d0011_l] ,
  ['d0100_d', d0100_d],
  ['d0100_l', d0100_l],
  ['d0101_d', d0101_d],
  ['d0101_l', d0101_l],
  ['d0110_d', d0110_d],
  ['d0110_l', d0110_l],
  ['d0111_d', d0111_d],
  ['d0111_l', d0111_l],
  ['d1000_d', d1000_d],
  ['d1001_d', d1001_d],
  ['d1001_l', d1001_l],
  ['d1010_d', d1010_d],
  ['d1010_l', d1010_l],
  ['d1011_d', d1011_d],
  ['d1011_l', d1011_l],
  ['d1100_d', d1100_d],
  ['d1100_l', d1100_l],
  ['d1101_d', d1101_d],
  ['d1101_l', d1101_l],
  ['d1110_d', d1110_d],
  ['d1110_l', d1110_l],
  ['d1111_d', d1111_d],
  ['d1111_l', d1111_l],
  ['e', e],
  ['gmBg', gmBg],
  ['n', n],
  ['ref', ref],
  ['s', s],
  ['w', w],
  ['s00_d', s00_d],
  ['s00_l', s00_l],
  ['s01_d', s01_d],
  ['s01_l', s01_l],
  ['s02_d', s02_d],
  ['s02_l', s02_l],
  ['s03_d', s03_d],
  ['s03_l', s03_l],
  ['s04_d', s04_d],
  ['s04_l', s04_l],
  ['s05_d', s05_d],
  ['s05_l', s05_l],
])

export default function getImage(code: string,themeSuffix: string = 'l') {
  const imgC = code + '_' + themeSuffix;
  return images.get(imgC)
}
