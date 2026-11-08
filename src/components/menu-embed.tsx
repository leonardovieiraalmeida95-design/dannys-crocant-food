"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { localPath, menuUrl } from "@/site-config";

function MenuContent() {
  const [enabled, setEnabled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    if (!enabled || loaded) return;
    const timeout = setTimeout(() => setSlow(true), 12000);
    return () => clearTimeout(timeout);
  }, [enabled, loaded]);

  const deactivate = () => { setEnabled(false); setLoaded(false); setSlow(false); };

  if (!enabled) return <div className="embed-placeholder">
    <span className="eyebrow">Você escolhe quando carregar</span>
    <h3>O cardápio fica no Anota AI.</h3>
    <p>Ao carregá-lo aqui, seu navegador se conectará a um serviço externo que pode utilizar cookies e coletar dados de navegação. Você pode continuar nesta demonstração sem ativá-lo.</p>
    <p><a href="https://anota.ai/politicas/Politica_de_Privacidade.pdf" target="_blank" rel="noopener noreferrer">Política do Anota AI ↗</a> · <a href={localPath("/privacidade/")}>Privacidade desta demonstração</a></p>
    <div className="embed-actions">
      <button type="button" className="btn btn-primary" onClick={() => setEnabled(true)}>Carregar cardápio externo</button>
      <a className="btn" href={menuUrl} target="_blank" rel="noopener noreferrer">Abrir em outra aba ↗</a>
    </div>
  </div>;

  return <>
    <div className="embed-controls">
      <span>Conteúdo externo ativado nesta visita</span>
      <button type="button" className="btn" onClick={deactivate}>Desativar cardápio</button>
    </div>
    {!loaded && <p className="embed-status" role="status">{slow ? "O serviço está demorando. Você pode abrir o cardápio em outra aba pelo link abaixo." : "Carregando o cardápio externo…"}</p>}
    <iframe className="menu-frame" src={menuUrl} title="Cardápio e pedidos externos da Danny’s no Anota AI" referrerPolicy="no-referrer" onLoad={() => setLoaded(true)} />
    <p className="embed-note">Desativar remove a incorporação. Cookies já criados pelo serviço devem ser gerenciados no navegador.</p>
  </>;
}

export default function MenuEmbed() {
  const [host, setHost] = useState<HTMLElement | null>(null);
  useEffect(() => { setHost(document.getElementById("menu-embed-slot")); }, []);
  return host ? createPortal(<MenuContent />, host) : null;
}
