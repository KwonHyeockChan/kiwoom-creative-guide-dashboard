import { notFound } from 'next/navigation';
import { getChannel, CHANNELS } from '../../../lib/channels';
import { ChannelForm } from '../../components/ChannelForm';
import { ImageGallery } from '../../components/ImageGallery';
import type { GuideLink, ImageSpec } from '../../../lib/types';

function ImageSpecTable({ specs }: { specs: ImageSpec[] }) {
  if (!specs.length) return null;
  return (
    <div className="overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/60">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-slate-700/50">
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">소재</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">사이즈</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">파일 형식</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">최대 용량</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">비고</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700/40">
          {specs.map((s, i) => (
            <tr key={i} className="transition hover:bg-slate-700/30">
              <td className="px-4 py-3 font-medium text-slate-100">{s.label}</td>
              <td className="px-4 py-3 font-mono text-xs text-slate-300">
                {s.size}
                {s.ratio && <span className="ml-1 text-slate-500">({s.ratio})</span>}
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  {s.formats.map((f) => (
                    <span key={f} className="rounded bg-slate-700/60 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-slate-300">{f}</span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-3 text-xs text-slate-400">
                {s.maxSizeKB ? `${s.maxSizeKB}KB` : s.maxSizeMB ? `${s.maxSizeMB}MB` : '-'}
              </td>
              <td className="px-4 py-3 text-xs text-slate-500">{s.notes ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


function GuideLinkBar({ links }: { links: GuideLink[] }) {
  if (!links.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((link, i) => (
        <a
          key={i}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-lg border border-slate-700/50 bg-slate-800/60 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-violet-500/60 hover:text-violet-300"
        >
          {link.type === 'pdf' ? (
            <svg className="h-3.5 w-3.5 shrink-0 text-rose-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
            </svg>
          ) : (
            <svg className="h-3.5 w-3.5 shrink-0 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          )}
          {link.label}
        </a>
      ))}
    </div>
  );
}

interface Props {
  params: Promise<{ channelId: string }>;
}

export default async function ChannelPage({ params }: Props) {
  const { channelId } = await params;
  const channel = getChannel(channelId);
  if (!channel) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <header className="mb-8">
        <div className="mb-2 flex items-center gap-2">
          <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${channel.color}`}>
            {channel.platform}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-white">{channel.name}</h2>
        {channel.links?.length ? (
          <div className="mt-3 space-y-1.5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">공식 가이드</p>
            <GuideLinkBar links={channel.links} />
          </div>
        ) : null}
      </header>

      <div className="space-y-10">
        {channel.formats.map((format) => (
          <section key={format.id} className="space-y-5">
            {channel.formats.length > 1 && (
              <h3 className="border-b border-slate-700/50 pb-2 text-base font-semibold text-slate-100">
                {format.name}
              </h3>
            )}

            {format.imageSpecs.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500">이미지 소재 가이드</h4>
                <ImageSpecTable specs={format.imageSpecs} />
              </div>
            )}

            <ImageGallery images={format.guideImages ?? []} label="레이아웃 가이드" />

            {format.notes && format.notes.length > 0 && (
              <div className="rounded-xl border border-amber-700/40 bg-amber-900/20 px-4 py-3">
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400">유의사항</p>
                <ul className="space-y-1">
                  {format.notes.map((note, i) => (
                    <li key={i} className="flex gap-2 text-xs text-amber-300/80">
                      <span className="mt-0.5 shrink-0 text-amber-500">•</span>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {format.textFields.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500">광고 문구 입력</h4>
                <div className="rounded-xl border border-slate-700/50 bg-slate-800/60 p-5">
                  <ChannelForm channelId={channelId} format={format} />
                </div>
              </div>
            )}

            <ImageGallery images={format.exampleImages ?? []} label="소재 예시" />

            {format.textFields.length === 0 && format.imageSpecs.length === 0 && (
              <div className="rounded-xl border border-slate-700/50 bg-slate-800/60 px-5 py-4 text-sm text-slate-500">
                이 광고 형식은 텍스트 문구 입력이 없습니다. 이미지 소재만 제작하면 됩니다.
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return CHANNELS.map((c) => ({ channelId: c.id }));
}
