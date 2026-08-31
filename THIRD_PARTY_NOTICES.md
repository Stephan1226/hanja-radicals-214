# Third-party notices

## 옛 자형 도판 (갑골문·금문·대전·소전)

`public/oracle/`의 옛 자형 이미지는 Wikimedia Commons에 공개된 고문자 자형 파일(주로 Ancient Chinese characters 프로젝트의 SVG)을 사용합니다. 파일별 저작자와 라이선스(CC BY-SA 3.0 등)는 각 글자 카드의 "도판·시대 출처 확인" 링크로 연결되는 원본 파일 페이지에 명시되어 있습니다.

- Source: https://commons.wikimedia.org/ (각 카드의 출처 링크 참조)
- License: 파일별 표기를 따름 (Public Domain / CC BY-SA 계열)

## 획순 데이터

`public/strokes/`의 획순 JSON은 Hanzi Writer Data에서 가져왔습니다. 한국 표준 자형과 다른 일부 글자(예: 靑)는 대응 자형(青)의 데이터를 사용합니다.

- Source: https://github.com/chanind/hanzi-writer-data
- License: Arphic Public License (원 데이터: Make Me a Hanzi / Arphic 서체 파생)

## 사자소학 원문

이 사이트의 사자소학 한문 원문은 저작권 보호기간이 지난 고전 작품을 대상으로 합니다. 현대어 번역문, 해설, 교감, 표점, 편집 구조는 별도 저작권의 대상이 될 수 있으므로 수록하지 않습니다.

원문 대조 참고: 동양고전종합DB 《사자소학》
https://db.cyberseodang.or.kr/front/sabuList/BookMain.do?bnCode=jti_5a0101&titleId=C3

## 현대어 뜻풀이

`app/sajaseohak-translations.ts`의 현대어 뜻풀이는 본 프로젝트를 위해 고전 원문을 바탕으로 새로 작성한 문장입니다. 위 참고처의 현대어 번역·주석·표점 문구를 수록하지 않습니다.

## 한자 독음

한자 독음 대조에는 Unicode Character Database의 Unihan 데이터를 참고했습니다.

- Source: https://www.unicode.org/Public/UCD/latest/ucd/Unihan.zip
- License: Unicode License v3
- Terms: https://www.unicode.org/copyright.html

## 한자 훈음

원문 읽기의 글자별 훈음은 HanjaDict의 MIT 라이선스 사전 데이터를 대조해 구성했습니다.

- Source: https://github.com/seyoungsong/hanjadict
- License: MIT

```text
MIT License

Copyright (c) 2025 Seyoung Song

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
