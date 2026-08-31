'use client';

import HanziWriter from 'hanzi-writer';
import { useEffect, useRef, useState } from 'react';
import { sajaseohakPassages as fullSajaseohakPassages } from './sajaseohak-data';
import { sajaseohakTranslations } from './sajaseohak-translations';

import { chapters, timeline, standaloneExamples, teacherNotes, positionTypes, strokeRules, evolutionSteps, introSlides } from './lesson-data';

function WhyHanjaSlide() {
  return (
    <div className="why-hanja-slide">
      <div className="why-hanja-copy">
        <span className="lesson-tag">WHY HANJA</span>
        <h3>한자는 왜 배울까?</h3>
        <p>이 슬라이드는 선생님의 이야기로 채우는 자리입니다.</p>
      </div>
      <div className="why-hanja-placeholder">
        <span>YOUR OPENING MESSAGE</span>
        <strong>여기에 수업을 여는<br />이야기를 적어 주세요.</strong>
        <small>학습 동기 · 생활 속 한자 · 오늘 수업과의 연결</small>
      </div>
    </div>
  );
}

function PositionSlide() {
  const [selectedPositionIndex, setSelectedPositionIndex] = useState(0);
  const selectedPosition = positionTypes[selectedPositionIndex];

  return (
    <div className="position-slide">
      <div className="slide-lead">
        <p>부수는 한자를 찾고 뜻을 짐작하게 하는 <strong>의미의 단서</strong>예요.</p>
        <span>위치 이름을 누르면, 부수가 글자 안에서 차지하는 자리를 크게 볼 수 있어요.</span>
      </div>
      <div className="position-showcase">
        <div className="position-picker" aria-label="부수 위치 선택">
          <span>부수 위치</span>
          <div>
            {positionTypes.map((item, index) => <button key={item.name} onClick={() => setSelectedPositionIndex(index)} className={index === selectedPositionIndex ? 'active' : ''} aria-pressed={index === selectedPositionIndex}>{item.name}</button>)}
          </div>
        </div>
        <div className="position-map-wrap">
          <div className={`position-map is-${selectedPosition.area}`} aria-label={`${selectedPosition.name}은 글자 ${selectedPosition.place}에 놓입니다.`}>
            <div className="position-highlight" />
            <div className="position-map-core" />
          </div>
          <strong>{selectedPosition.name}</strong>
        </div>
        <article className="position-explainer">
          <span>{selectedPosition.place}</span>
          <h4>{selectedPosition.name}</h4>
          <p>{selectedPosition.description}</p>
          <div><b>대표 부수</b><ul>{selectedPosition.radicals.map((radical) => <li key={radical}>{radical}</li>)}</ul></div>
        </article>
      </div>
    </div>
  );
}

function VariantSlide() {
  return (
    <div className="variant-slide">
      <div className="variant-focus"><span className="lesson-tag">ONE RADICAL, MANY FORMS</span><b>心</b><strong>마음 심</strong></div>
      <div className="variant-flow">
        <article><div className="variant-glyph">心</div><strong>글자 아래</strong><span>마음심발</span><p>想 · 忘</p></article>
        <i>→</i>
        <article><div className="variant-glyph accent">忄</div><strong>글자 왼쪽</strong><span>심방변</span><p>情 · 急</p></article>
        <i>→</i>
        <article><div className="variant-glyph">⺗</div><strong>글자 아래</strong><span>마음심발</span><p>恭 · 慕</p></article>
      </div>
      <p className="slide-note">뜻의 뿌리는 이어지지만, 위치와 글자 모양에 맞춰 부수의 모습과 이름이 바뀝니다.</p>
    </div>
  );
}

function StrokeSlide() {
  return (
    <div className="stroke-slide">
      <ol className="stroke-rules">{strokeRules.map(([no, rule, examples]) => <li key={no}><span>{no}</span><b>{rule}</b><em>{examples}</em></li>)}</ol>
      <p className="rule-caveat">원칙은 출발점입니다. 개별 글자의 표준 필순과 예외는 획순 애니메이션으로 다시 확인합니다.</p>
    </div>
  );
}

function EvolutionSlide() {
  return (
    <div className="evolution-slide"><div className="evolution-line">
      {evolutionSteps.map((step, index) => <div className="evolution-step" key={step.name}>{index > 0 && <i>→</i>}<div className="evolution-glyph">{step.image ? <img src={step.image} alt={`人의 ${step.name} 자형`} /> : step.glyph}</div><strong>{step.name}</strong><span>{step.period}</span><small>{step.note}</small></div>)}
    </div></div>
  );
}

function FoundationBoard({ showTeacherNotes, currentSlide, onSlideChange }: { showTeacherNotes: boolean; currentSlide: number; onSlideChange: (index: number) => void }) {
  const slide = introSlides[currentSlide];
  const previous = () => onSlideChange((currentSlide - 1 + introSlides.length) % introSlides.length);
  const next = () => onSlideChange((currentSlide + 1) % introSlides.length);

  return (
    <section className="intro-deck">
      <div className="intro-progress" aria-label={`슬라이드 ${currentSlide + 1} / ${introSlides.length}`}>
        {introSlides.map((item, index) => <button key={item.label} onClick={() => onSlideChange(index)} className={index === currentSlide ? 'active' : ''} aria-label={`${index + 1}번 슬라이드: ${item.title}`} />)}
      </div>
      <article className={`intro-slide intro-slide-${currentSlide}`}>
        <header className="intro-slide-header"><span className="lesson-tag">{slide.label}</span><span className="slide-count">0{currentSlide + 1} / 0{introSlides.length}</span><h3>{slide.title}</h3><p>{slide.description}</p></header>
        <div className="intro-slide-content">
          {currentSlide === 0 && <WhyHanjaSlide />}
          {currentSlide === 1 && <PositionSlide />}
          {currentSlide === 2 && <VariantSlide />}
          {currentSlide === 3 && <StrokeSlide />}
          {currentSlide === 4 && <EvolutionSlide />}
        </div>
      </article>
      {showTeacherNotes && currentSlide === 1 && <aside className="foundation-note"><b>교사 노트</b> 먼저 왼쪽·오른쪽·위·아래·감싼 자리를 말하게 한 뒤, 변·방·머리·발 같은 관용 명칭을 붙여 주세요. 명칭은 사전·교재에 따라 조금씩 다를 수 있습니다.</aside>}
      <div className="slide-controls"><button onClick={previous}>← 이전</button><span><kbd>←</kbd><kbd>→</kbd>로 넘기기</span><button onClick={next}>다음 →</button></div>
    </section>
  );
}

function StrokeAnimator({ glyph }: { glyph: string }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<ReturnType<typeof HanziWriter.create> | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;
    let active = true;
    let dataReady = false;
    target.innerHTML = '';
    setStatus('loading');
    const size = Math.min(280, Math.max(190, target.clientWidth || 250));
    const writer = HanziWriter.create(target, glyph, {
      width: size,
      height: size,
      padding: 18,
      showOutline: true,
      showCharacter: false,
      strokeColor: '#c34f35',
      outlineColor: '#d4cec0',
      strokeAnimationSpeed: 1.15,
      delayBetweenStrokes: 360,
      charDataLoader: (character) => fetch(`/strokes/${encodeURIComponent(character)}.json`).then((response) => {
        if (!response.ok) throw new Error('획순 데이터를 불러오지 못했습니다.');
        return response.json();
      }),
      onLoadCharDataSuccess: () => {
        if (!active) return;
        dataReady = true;
        setStatus('ready');
        void writer.animateCharacter();
      },
      onLoadCharDataError: () => active && setStatus('error'),
    });
    writerRef.current = writer;
    return () => {
      active = false;
      if (dataReady) {
        try { void writer.pauseAnimation().catch(() => undefined); } catch { /* 데이터 로드 전 정리 오류 무시 */ }
      }
      target.innerHTML = '';
    };
  }, [glyph]);

  const replay = () => {
    const writer = writerRef.current;
    if (!writer) return;
    void writer.hideCharacter({ duration: 80 }).then(() => writer.animateCharacter());
  };

  return (
    <div className="stroke-player">
      <div className="stroke-grid" ref={targetRef} aria-label={`${glyph} 획순 애니메이션`} />
      {status === 'loading' && <span className="stroke-status">획순 불러오는 중…</span>}
      {status === 'error' && <span className="stroke-status error">이 글자의 획순 데이터를 찾지 못했습니다.</span>}
      <button onClick={replay} disabled={status !== 'ready'}><span>▶</span> 획순 다시 보기</button>
      <small>붉은 선을 따라 한 획씩 관찰하세요.</small>
    </div>
  );
}

function SajaSeohakBoard({ readingMode, passageIndex, onPassageChange, onReadingModeChange }: {
  readingMode: 'meaning' | 'original';
  passageIndex: number;
  onPassageChange: (index: number) => void;
  onReadingModeChange: (mode: 'meaning' | 'original') => void;
}) {
  const passage = fullSajaseohakPassages[passageIndex];
  const previous = () => onPassageChange((passageIndex - 1 + fullSajaseohakPassages.length) % fullSajaseohakPassages.length);
  const next = () => onPassageChange((passageIndex + 1) % fullSajaseohakPassages.length);

  return (
    <section className="appendix-board">
      <header className="appendix-header">
        <div>
          <p className="eyebrow">APPENDIX · 四字小學</p>
          <h2>사자소학</h2>
          <p className="appendix-subtitle">뜻과 함께 빠르게 읽고, 필요할 때 원문을 살펴보세요.</p>
          <div className="appendix-reading-toggle" aria-label="사자소학 읽기 방식">
            <button onClick={() => onReadingModeChange('meaning')} className={readingMode === 'meaning' ? 'active' : ''}>뜻과 함께 읽기</button>
            <button onClick={() => onReadingModeChange('original')} className={readingMode === 'original' ? 'active' : ''}>원문 읽기</button>
          </div>
        </div>
        <span className="appendix-count">{readingMode === 'meaning' ? `전문 ${fullSajaseohakPassages.length}절` : `${String(passage.no).padStart(2, '0')} / ${fullSajaseohakPassages.length}`}</span>
      </header>

      <aside className="appendix-preface">
        <span>이 부록을 여는 말</span>
        사자소학에는 지금 시대와 맞지 않는 생각도 여럿 있습니다. 그럼에도 여전히 이 내용을 중요하게 생각하시는 어른들이 있기에, 한 번쯤 읽어 보고 예를 갖추려 노력하는 일은 한국에서 살아가는 데 큰 자산이 될지 모릅니다.
      </aside>

      {readingMode === 'original' && <nav className="passage-nav" aria-label="사자소학 구절 선택">
        {fullSajaseohakPassages.map((item, index) => (
          <button key={item.no} onClick={() => onPassageChange(index)} className={index === passageIndex ? 'active' : ''}>
            <span>{String(item.no).padStart(2, '0')}</span>제{item.no}절
          </button>
        ))}
      </nav>}

      {readingMode === 'meaning' ? (
        <article className="reading-sheet continuous-reading" aria-label="사자소학 뜻과 함께 읽기">
          {fullSajaseohakPassages.map((item) => (
            <section key={item.no} className="continuous-reading-section">
              <header><span>四字小學 · {String(item.no).padStart(2, '0')}</span></header>
              <p className="flow-reading">{item.lines.map((line, lineIndex) => <span key={line.hanja} className="flow-reading-unit"><b>{line.hanja}({line.reading})</b> {sajaseohakTranslations[item.no - 1][lineIndex]}</span>)}</p>
            </section>
          ))}
        </article>
      ) : (
        <article className="reading-sheet is-original">
          <header><span>四字小學 · 第 {passage.no} 節</span><h3>제{passage.no}절 원문 읽기</h3></header>
          <ol className="original-reading" aria-label={`사자소학 제${passage.no}절 원문 읽기`}>
            {passage.lines.map((line, lineIndex) => (
              <li key={line.hanja}>
                <strong>{line.hanja}</strong>
                <span>{line.reading}</span>
                <p>{line.hun}</p>
                <em>{sajaseohakTranslations[passageIndex][lineIndex]}</em>
              </li>
            ))}
          </ol>
        </article>
      )}

      {readingMode === 'original' && <div className="appendix-controls">
        <button onClick={previous}>← 이전 구절</button>
        <span>네 글자씩 원문을 살피는 중</span>
        <button onClick={next}>다음 구절 →</button>
      </div>}
    </section>
  );
}

export default function Home() {
  const [chapterIndex, setChapterIndex] = useState(0);
  const [characterIndex, setCharacterIndex] = useState(0);
  const [introSlide, setIntroSlide] = useState(0);
  const [mode, setMode] = useState<'explore' | 'plan' | 'quiz'>('explore');
  const [visualMode, setVisualMode] = useState<'ancient' | 'strokes'>('ancient');
  const [sajaseohakMode, setSajaseohakMode] = useState<'meaning' | 'original'>('meaning');
  const [sajaseohakPassageIndex, setSajaseohakPassageIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [showTeacherNotes, setShowTeacherNotes] = useState(false);
  const [sideNavCollapsed, setSideNavCollapsed] = useState(false);
  const chapter = chapters[chapterIndex];
  const selected = chapter.characters[characterIndex] || chapter.characters[0];
  const quizItem = chapter.characters[characterIndex % chapter.characters.length] || chapter.characters[0];
  const progress = chapter.no;
  const selectedTeacherNote = teacherNotes[`${chapter.no}:${selected.glyph}`];
  const wordExamples = standaloneExamples[selected.glyph] || [];

  const selectChapter = (index: number) => {
    setChapterIndex(index);
    setCharacterIndex(0);
    setRevealed(false);
    setMode('explore');
    setVisualMode('ancient');
    setIntroSlide(0);
    setSajaseohakMode('meaning');
    setSajaseohakPassageIndex(0);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (chapter.appendix) {
        if (event.key === 'ArrowRight') setSajaseohakPassageIndex((i) => (i + 1) % fullSajaseohakPassages.length);
        if (event.key === 'ArrowLeft') setSajaseohakPassageIndex((i) => (i - 1 + fullSajaseohakPassages.length) % fullSajaseohakPassages.length);
        return;
      }
      if (chapter.intro) {
        if (event.key === 'ArrowRight') setIntroSlide((i) => (i + 1) % introSlides.length);
        if (event.key === 'ArrowLeft') setIntroSlide((i) => (i - 1 + introSlides.length) % introSlides.length);
        return;
      }
      if (event.key === 'ArrowRight') setCharacterIndex((i) => (i + 1) % chapter.characters.length);
      if (event.key === 'ArrowLeft') setCharacterIndex((i) => (i - 1 + chapter.characters.length) % chapter.characters.length);
      if (event.key === ' ') { event.preventDefault(); setRevealed((value) => !value); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [chapter.appendix, chapter.characters.length, chapter.intro]);

  return (
    <main className={`course-shell ${sideNavCollapsed ? 'is-rail-collapsed' : ''}`}>
      <aside className="chapter-rail">
        <div className="brand-row">
          <svg className="brand-symbol" viewBox="0 0 48 48" aria-label="부수와 획을 나타내는 수업 심볼" role="img">
            <rect x="1" y="1" width="46" height="46" rx="4" fill="none" stroke="rgba(255,255,255,.62)" />
            <path d="M14 12v24" stroke="#c34f35" strokeWidth="3" strokeLinecap="round" />
            <path d="M23 15h12M23 24h9M23 33h12" stroke="#f8f3e7" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <button
            className="menu-hint"
            type="button"
            onClick={() => setSideNavCollapsed((value) => !value)}
            aria-expanded={!sideNavCollapsed}
            aria-label={sideNavCollapsed ? '사이드 목차 펼치기' : '사이드 목차 접기'}
            title={sideNavCollapsed ? '사이드 목차 펼치기' : '사이드 목차 접기'}
          >
            <svg className="menu-hint-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d={sideNavCollapsed ? 'M9 5.5 15 12 9 18.5' : 'M15 5.5 9 12l6 6.5'} />
            </svg>
          </button>
        </div>
        <p className="eyebrow">214 RADICALS · 10 CLASSES</p>
        <h1>한자의 뿌리,<br />부수 특강</h1>
        <nav aria-label="챕터 목록">
          {chapters.map((item, index) => (
            <button key={item.no} onClick={() => selectChapter(index)} className={`chapter-link ${index === chapterIndex ? 'active' : ''}`} aria-label={`${item.no} ${item.nav}`} title={sideNavCollapsed ? item.nav : undefined}>
              <span className="chapter-number">{item.no}</span><span className="chapter-label">{item.nav}</span>
            </button>
          ))}
        </nav>
        <div className="rail-footer">교수용 웹 수업자료 · DRAFT 01</div>
      </aside>

      <section className="lesson-stage">
        <header className="topbar">
          {!chapter.appendix && <div className="mode-tabs" aria-label="화면 모드">
            {chapter.intro ? <button className="active">도입 슬라이드</button> : <>
              <button onClick={() => setMode('explore')} className={mode === 'explore' ? 'active' : ''}>글자 탐구</button>
              <button onClick={() => setMode('plan')} className={mode === 'plan' ? 'active' : ''}>수업 설계</button>
              <button onClick={() => { setMode('quiz'); setRevealed(false); }} className={mode === 'quiz' ? 'active' : ''}>퀴즈</button>
            </>}
          </div>}
          <div className="topbar-actions">
            {!chapter.appendix && <button className={`teacher-toggle ${showTeacherNotes ? 'active' : ''}`} onClick={() => setShowTeacherNotes((value) => !value)}><span>교사 노트</span>{showTeacherNotes ? 'ON' : 'OFF'}</button>}
            <div className="shortcuts">{chapter.appendix ? <><kbd>←</kbd><kbd>→</kbd> 구절 이동</> : chapter.intro ? <><kbd>←</kbd><kbd>→</kbd> 슬라이드 이동</> : <><kbd>←</kbd><kbd>→</kbd> 글자 이동 <kbd>Space</kbd> 정답</>}</div>
          </div>
        </header>

        {!chapter.intro && !chapter.appendix && <header className="stage-header">
          <div>
            <p className="eyebrow">CHAPTER {chapter.no} · 50 MIN · {chapter.focus}</p>
            <h2>{chapter.title}</h2>
          </div>
          <div className="time-badge"><strong>{chapter.intro ? '入' : chapter.count}</strong><span>{chapter.intro ? '기초 개념' : chapter.countLabel || (chapter.count === '0' ? '종합 활동' : '새 부수')}</span></div>
        </header>}

        {mode === 'explore' && chapter.intro && <FoundationBoard showTeacherNotes={showTeacherNotes} currentSlide={introSlide} onSlideChange={setIntroSlide} />}

        {chapter.appendix && <SajaSeohakBoard readingMode={sajaseohakMode} passageIndex={sajaseohakPassageIndex} onPassageChange={setSajaseohakPassageIndex} onReadingModeChange={setSajaseohakMode} />}

        {mode === 'explore' && !chapter.intro && !chapter.appendix && (
          <>
            <section className="hero-panel">
              <div className="visual-panel">
                <div className="visual-tabs" aria-label="글자 보기 방식">
                  <button onClick={() => setVisualMode('ancient')} className={visualMode === 'ancient' ? 'active' : ''}>옛글자</button>
                  <button onClick={() => setVisualMode('strokes')} className={visualMode === 'strokes' ? 'active' : ''}>획순 애니메이션</button>
                </div>
                {visualMode === 'ancient' ? (
                  <div className="oracle-frame">
                    <span className="frame-label">{selected.ancientLabel || '갑골문(甲骨文)'}</span>
                    {selected.image ? (
                      <img src={selected.image} alt={`${selected.glyph}의 갑골문 형태`} />
                    ) : (
                      <div className="pending-oracle"><strong>{selected.glyph}</strong><span>확인된 도판은 없지만<br />자형 설명은 수록했습니다.</span></div>
                    )}
                    {selected.ancientNote && <p className="ancient-note">{selected.ancientNote}</p>}
                    {selected.source ? <a className="source-link" href={selected.source} target="_blank" rel="noreferrer">도판·시대 출처 확인 ↗</a> : <span className="source-link muted">추정 도판 대신 설명만 제공</span>}
                  </div>
                ) : (
                  <div className="stroke-frame"><StrokeAnimator glyph={selected.glyph} /></div>
                )}
              </div>
              <div className="glyph-story">
                <span className="lesson-tag">{selected.kind || '부수'} · RADICAL</span>
                <div className="glyph-line">
                  <span className="main-glyph">{selected.glyph}</span>
                  <div><strong>{selected.reading}</strong><small>총 {selected.strokes}획</small>{selected.variant && <em>부수 변형 {selected.variantName || selected.variant}</em>}</div>
                </div>
                <p>{selected.story}</p>
                <div className="example-groups">
                  <div className="related-row"><span>관련 글자</span>{selected.related.map((item) => <b key={item}>{item}</b>)}</div>
                  {wordExamples.length > 0 && <div className="word-example-row"><span>단어 예시</span>{wordExamples.map((item) => <b key={item}>{item}</b>)}</div>}
                </div>
                {showTeacherNotes && selectedTeacherNote && <aside className="character-teacher-note"><b>교사 노트</b><p>{selectedTeacherNote}</p></aside>}
                <div className="teaching-cue"><span>교사 질문</span>{chapter.cue}</div>
              </div>
            </section>

            <section className="character-strip" aria-label="글자 선택">
              {chapter.characters.map((item, index) => (
                <button key={`${item.glyph}-${index}`} onClick={() => setCharacterIndex(index)} className={index === characterIndex ? 'selected' : ''}>
                  <strong>{item.glyph}</strong><span>{item.reading}</span>
                </button>
              ))}
            </section>
          </>
        )}

        {mode === 'plan' && !chapter.appendix && (
          <section className="plan-board">
            <article className="objective-card">
              <span className="lesson-tag">LEARNING GOAL</span>
              <h3>오늘의 수업 목표</h3>
              <p>{chapter.objective}</p>
              <div className="range-box"><small>이번 시간 부수 범위</small><strong>{chapter.range}</strong></div>
            </article>
            <article className="timeline-card">
              <span className="lesson-tag">50 MINUTE FLOW</span>
              <h3>수업 흐름</h3>
              <ol>{timeline.map(([time, label], index) => <li key={time}><span>{time}분</span><b>{label}</b><i style={{ width: `${[14, 46, 20, 14, 6][index]}%` }} /></li>)}</ol>
            </article>
            <article className="activity-card">
              <span className="lesson-tag">CLASS ACTIVITY</span>
              <h3>적용 활동</h3>
              <p>{chapter.activity}</p>
              <div className="teacher-note"><b>교사 메모</b> 설명보다 학생의 관찰 문장을 먼저 받고, 부수 이름은 마지막에 확인합니다.</div>
            </article>
          </section>
        )}

        {mode === 'quiz' && !chapter.appendix && (
          <section className={`quiz-board ${revealed ? 'revealed' : ''}`}>
            <div className="quiz-number">Q{characterIndex + 1}</div>
            <p>이 글자의 부수와 의미 계열을 추론해 보세요.</p>
            <div className="quiz-glyph">{quizItem.glyph}</div>
            <div className="answer-panel">
              {revealed ? <><strong>{quizItem.reading} · {quizItem.strokes}획</strong><p>{quizItem.story}</p><div>{quizItem.related.join(' · ')}</div></> : <button onClick={() => setRevealed(true)}>정답 보기</button>}
            </div>
            <div className="quiz-controls">
              <button onClick={() => { setCharacterIndex((i) => (i - 1 + chapter.characters.length) % chapter.characters.length); setRevealed(false); }}>← 이전</button>
              <button onClick={() => setRevealed((value) => !value)}>{revealed ? '정답 가리기' : '힌트 없이 생각하기'}</button>
              <button onClick={() => { setCharacterIndex((i) => (i + 1) % chapter.characters.length); setRevealed(false); }}>다음 →</button>
            </div>
          </section>
        )}

        <footer className="stage-footer">
          <p><strong>{chapter.appendix ? '부록 범위' : '오늘의 범위'}</strong>{chapter.range}</p>
          <span>{chapter.appendix ? '부록' : `${progress} / 10`}</span>
        </footer>
      </section>
    </main>
  );
}
