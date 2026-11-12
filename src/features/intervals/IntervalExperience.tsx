import { playInterval } from '../../audio/intervalPlayer';
import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  intervalPositions,
  intervals,
  roots,
} from '../../music-domain/intervals';
import styles from './IntervalExperience.module.css';

export function IntervalExperience({
  practice = false,
}: {
  practice?: boolean;
}) {
  const [params, setParams] = useSearchParams();
  const parsedRoot = Number(params.get('tom') ?? 5);
  const root =
    Number.isInteger(parsedRoot) && parsedRoot >= 0 && parsedRoot < 12
      ? parsedRoot
      : 5;
  const interval =
    intervals.find((item) => item.id === params.get('intervalo')) ??
    intervals[0];
  const { rootFret, targetFret, rootMidi, targetMidi } = intervalPositions(
    root,
    interval.semitones,
  );
  const [answer, setAnswer] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [activeNote, setActiveNote] = useState<number | null>(null);
  const [audioError, setAudioError] = useState('');
  const stop = useRef<(() => void) | undefined>(undefined);
  const generation = useRef(0);
  useEffect(
    () => () => {
      generation.current += 1;
      stop.current?.();
    },
    [],
  );
  function change(key: string, value: string) {
    generation.current += 1;
    stop.current?.();
    setPlaying(false);
    setActiveNote(null);
    setAnswer(null);
    const next = new URLSearchParams(params);
    next.set(key, value);
    setParams(next, { replace: true });
  }
  async function listen() {
    const current = ++generation.current;
    setPlaying(true);
    setAudioError('');
    try {
      const cancel = await playInterval(
        [rootMidi, targetMidi],
        (index) => setActiveNote(index),
        () => {
          setPlaying(false);
          setActiveNote(null);
        },
      );
      if (generation.current !== current) cancel();
      else stop.current = cancel;
    } catch {
      if (generation.current === current) {
        setPlaying(false);
        setAudioError(
          'Não foi possível iniciar o áudio. Tente novamente em um navegador com Web Audio.',
        );
      }
    }
  }
  const context = `?tom=${root}&intervalo=${interval.id}`;
  return (
    <div className={styles.lesson}>
      <div className={styles.intro}>
        <p className={styles.eyebrow}>01 / Intervalos na guitarra</p>
        <h2>
          {practice
            ? 'Encontre a distância. Ouça a relação.'
            : 'Duas notas. Uma nova forma de ouvir.'}
        </h2>
        <p>
          {practice
            ? 'Toque a tônica e procure a nota do intervalo na sexta corda. Confira no mapa e compare com o som.'
            : 'Por que mudar uma nota muda tanto o som? Um intervalo é a distância entre duas notas. Aqui você vai reconhecer a terça maior e a quinta justa a partir de uma tônica.'}
        </p>
      </div>
      <div className={styles.controls}>
        <label>
          Tônica{' '}
          <select
            value={root}
            onChange={(event) => change('tom', event.target.value)}
          >
            {roots.map((name, index) => (
              <option key={name} value={index}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Intervalo{' '}
          <select
            value={interval.id}
            onChange={(event) => change('intervalo', event.target.value)}
          >
            {intervals.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <section className={styles.panel} aria-labelledby="map-title">
        <p className={styles.eyebrow}>Ver & ouvir</p>
        <h3 id="map-title">
          {roots[root]} → {interval.label.toLowerCase()}
        </h3>
        <p>
          Cada casa avança um semitom. A {interval.label.toLowerCase()} fica{' '}
          {interval.semitones} semitons acima da tônica.
        </p>
        <p className={styles.caption}>
          Recorte da 6ª corda (Mi grave), da casa {rootFret} à {targetFret}.
          Leia da esquerda para a direita.
        </p>
        <ol className={styles.frets} aria-label="Casas da sexta corda">
          {Array.from({ length: interval.semitones + 1 }, (_, offset) => {
            const tonic = offset === 0;
            const target = offset === interval.semitones;
            const active =
              (tonic && activeNote === 0) || (target && activeNote === 1);
            return (
              <li
                key={offset}
                className={`${tonic || target ? styles.marked : ''} ${active ? styles.sounding : ''}`}
              >
                <span>{tonic ? 'T' : target ? interval.degree : '·'}</span>
                <small>
                  {rootFret + offset === 0 ? 'Solta' : rootFret + offset}
                </small>
              </li>
            );
          })}
        </ol>
        <p className={styles.caption}>
          T = tônica · {interval.degree} = {interval.label.toLowerCase()}
          {activeNote !== null
            ? ` · Tocando: ${activeNote === 0 ? 'tônica' : interval.label.toLowerCase()}`
            : ''}
        </p>
        <div className={styles.actions}>
          <button disabled={playing} onClick={() => void listen()}>
            {playing ? 'Reproduzindo…' : 'Ouvir as duas notas'}
          </button>
          {playing && (
            <button
              onClick={() => {
                generation.current += 1;
                stop.current?.();
                setPlaying(false);
                setActiveNote(null);
              }}
            >
              Parar áudio
            </button>
          )}
        </div>
        <p className={styles.caption}>
          Som sintetizado: tônica primeiro, intervalo depois. Ajuste o volume
          antes de ouvir.
        </p>
        {audioError && <p role="alert">{audioError}</p>}
      </section>
      <section className={styles.panel} aria-labelledby="apply-title">
        <p className={styles.eyebrow}>Aplicar na guitarra</p>
        <h3 id="apply-title">Toque, compare, repita</h3>
        <ol>
          <li>
            Na sexta corda, toque a casa{' '}
            {rootFret === 0 ? '0 (corda solta)' : rootFret}: essa é a tônica{' '}
            {roots[root]}.
          </li>
          <li>
            Avance {interval.semitones} casas e toque a casa {targetFret}.
            Mantenha a mesma corda.
          </li>
          <li>
            Alterne as duas notas devagar. Cante a segunda nota antes de tocá-la
            e compare com a demonstração.
          </li>
        </ol>
        <p>
          A terça maior é um dos intervalos que dá identidade ao acorde maior. A
          quinta justa aparece com frequência nos power chords. Aqui tocamos as
          notas em sequência, sem formar o acorde.
        </p>
      </section>
      <section className={styles.panel} aria-labelledby="quiz-title">
        <p className={styles.eyebrow}>Recuperar sem olhar</p>
        <h3 id="quiz-title">
          Quantos semitons tem uma {interval.label.toLowerCase()}?
        </h3>
        <p>Afaste o olhar do mapa e responda. Depois, confira na guitarra.</p>
        <div className={styles.actions}>
          {[3, 4, 7].map((value) => (
            <button
              key={value}
              aria-pressed={answer === value}
              onClick={() => setAnswer(value)}
            >
              {value} semitons
            </button>
          ))}
        </div>
        <p role="status">
          {answer === null
            ? 'Escolha uma resposta.'
            : answer === interval.semitones
              ? `Isso! ${interval.label}: ${interval.semitones} semitons. Agora toque sem consultar o mapa.`
              : `Tente novamente. Conte uma casa por semitom a partir da tônica, sem contar a casa inicial.`}
        </p>
      </section>
      <Link
        className={styles.next}
        to={`${practice ? '/estudo' : '/praticar'}${context}`}
      >
        {practice ? 'Voltar à lição' : 'Levar este exercício para Praticar'} →
      </Link>
    </div>
  );
}
