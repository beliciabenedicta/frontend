// Props: type, color, height
export default function Bottle({ type = 'dropper', color = '#9CC7EA', height = 150 }) {
  const ink = '#1D3552'
  const wrap = (viewBox, h, children) => (
    <svg viewBox={viewBox} height={h} aria-hidden="true">{children}</svg>
  )

  if (type === 'tube')
    return wrap('0 0 70 150', height, <>
      <path d="M14 6h42l4 112H10z" fill={color} />
      <rect x="12" y="116" width="46" height="26" rx="6" fill={ink} opacity=".85" />
      <rect x="20" y="40" width="30" height="36" rx="6" fill="#fff" opacity=".8" />
      <rect x="25" y="50" width="20" height="4" rx="2" fill={ink} opacity=".6" />
    </>)

  if (type === 'jar')
    return wrap('0 0 110 100', height * 0.66, <>
      <rect x="8" y="10" width="94" height="28" rx="10" fill={ink} opacity=".85" />
      <rect x="12" y="36" width="86" height="58" rx="14" fill={color} />
      <rect x="28" y="52" width="54" height="26" rx="6" fill="#fff" opacity=".8" />
      <rect x="36" y="60" width="30" height="4" rx="2" fill={ink} opacity=".6" />
    </>)

  if (type === 'pump')
    return wrap('0 0 80 160', height, <>
      <rect x="36" y="2" width="30" height="9" rx="4" fill={ink} />
      <rect x="36" y="9" width="8" height="26" fill={ink} />
      <rect x="24" y="32" width="32" height="12" rx="3" fill={ink} opacity=".85" />
      <rect x="12" y="44" width="56" height="110" rx="14" fill={color} />
      <rect x="20" y="82" width="40" height="44" rx="6" fill="#fff" opacity=".8" />
      <rect x="25" y="91" width="26" height="4" rx="2" fill={ink} opacity=".6" />
    </>)

  if (type === 'spray')
    return wrap('0 0 80 160', height, <>
      <rect x="28" y="6" width="26" height="16" rx="4" fill={ink} />
      <rect x="50" y="9" width="14" height="6" rx="3" fill={ink} />
      <rect x="32" y="22" width="18" height="16" fill={ink} opacity=".85" />
      <rect x="16" y="38" width="48" height="116" rx="16" fill={color} />
      <rect x="22" y="80" width="36" height="46" rx="6" fill="#fff" opacity=".8" />
      <rect x="27" y="90" width="22" height="4" rx="2" fill={ink} opacity=".6" />
    </>)

  // default: dropper
  return wrap('0 0 80 150', height, <>
    <rect x="31" y="4" width="18" height="30" rx="9" fill={ink} opacity=".85" />
    <rect x="28" y="30" width="24" height="12" rx="3" fill={ink} />
    <rect x="14" y="42" width="52" height="102" rx="14" fill={color} />
    <rect x="22" y="76" width="36" height="40" rx="6" fill="#fff" opacity=".8" />
    <rect x="26" y="84" width="22" height="4" rx="2" fill={ink} opacity=".6" />
  </>)
}