import React, { useState, useRef } from 'react';
import { Copy, Check, Code, User, Mail, MapPin, Globe, Image as ImageIcon, LayoutTemplate } from 'lucide-react';
import { ImageCropper } from './components/ImageCropper';
import { DEFAULT_PRICTURE } from './assets/default_pricture';

export default function App() {
  const [data, setData] = useState({
    profilePic: DEFAULT_PRICTURE,
    name: 'Nome',
    role: 'Cargo',
    department: 'Departamento',
    email: 'email@bwsiot.com',
    phone: '(11) 9 9999-9999',
  });

  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedVisual, setCopiedVisual] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const copyHtml = () => {
    if (previewRef.current) {
      navigator.clipboard.writeText(previewRef.current.innerHTML);
      setCopiedHtml(true);
      setTimeout(() => setCopiedHtml(false), 2000);
    }
  };

  const copyVisual = () => {
    if (previewRef.current) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(previewRef.current);
      selection?.removeAllRanges();
      selection?.addRange(range);
      try {
        document.execCommand('copy');
        setCopiedVisual(true);
        setTimeout(() => setCopiedVisual(false), 2000);
      } catch (e) {
        console.error('Falha ao copiar:', e);
      }
      selection?.removeAllRanges();
    }
  };

  return (
    <>
    <div className="h-screen w-full bg-slate-50 flex flex-col md:flex-row overflow-hidden font-sans text-slate-800">
      {/* Sidebar Form */}
      <aside className="w-full md:w-[320px] bg-white border-r border-slate-200 flex flex-col h-full z-10 flex-shrink-0">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <LayoutTemplate className="text-slate-900 w-6 h-6" />
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none">Assinatura Pro</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1.5 font-semibold leading-none">Editor de Identidade</p>
          </div>
        </div>

        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          <section>
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <User className="w-4 h-4" /> Dados Pessoais
            </h2>
            <div className="space-y-4">
              <label className="block">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Nome Completo</span>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </label>
              <label className="block">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Cargo</span>
                <input
                  type="text"
                  name="role"
                  value={data.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </label>
              <label className="block">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Departamento</span>
                <input
                  type="text"
                  name="department"
                  value={data.department}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </label>
            </div>
          </section>

          <section>
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Contato
            </h2>
            <div className="space-y-4">
              <label className="block">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">E-mail</span>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </label>
              <label className="block">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Telefone / Celular</span>
                <input
                  type="text"
                  name="phone"
                  value={data.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </label>
            </div>
          </section>

          <section>
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" /> Imagens
            </h2>
            <div className="space-y-4">
              <label className="block">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Foto de Perfil (Upload)</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setImageToCrop(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                />
              </label>
            </div>
          </section>
        </div>

        {/* Action Buttons in Sidebar Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-3">
          <button
            onClick={copyHtml}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white border border-slate-200 text-slate-700 rounded font-semibold text-sm hover:bg-slate-100 active:scale-[0.98] transition-all"
          >
            {copiedHtml ? <Check className="w-4 h-4 text-green-500" /> : <Code className="w-4 h-4" />}
            {copiedHtml ? 'HTML Copiado!' : 'Copiar HTML'}
          </button>
          <button
            onClick={copyVisual}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-slate-900 text-white rounded font-semibold text-sm hover:bg-slate-800 active:scale-[0.98] transition-all"
          >
            {copiedVisual ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copiedVisual ? 'Assinatura Copiada!' : 'Copiar Assinatura'}
          </button>
        </div>
      </aside>

      {/* Main Content Preview */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative overflow-y-auto">
        <div className="w-full max-w-3xl bg-white shadow-2xl rounded-xl overflow-hidden border border-slate-200">
          {/* Window Decoration */}
          <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-300"></div>
            <div className="w-3 h-3 rounded-full bg-slate-300"></div>
            <div className="w-3 h-3 rounded-full bg-slate-300"></div>
            <span className="text-[11px] text-slate-500 ml-4 font-medium tracking-wide">Visualização em Tempo Real</span>
          </div>
          
          <div className="p-8 md:p-12 overflow-x-auto bg-white flex justify-center items-center">
            {/* INÍCIO DA ASSINATURA */}
            <div ref={previewRef} className="signature-container">
              <table cellPadding="0" cellSpacing="0" border={0} align="left" style={{ margin: '0px', borderCollapse: 'collapse', maxWidth: '100%', width: 'auto' }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '0px 1px 0px 0px' }}>
                      <table cellPadding="0" cellSpacing="0" border={0} style={{ borderCollapse: 'collapse', margin: '0px' }}>
                        <tbody>
                          <tr>
                            {data.profilePic && (
                              <td align="center" valign="top" style={{ padding: '0px 10px 0px 0px', verticalAlign: 'top' }}>
                                <table cellPadding="0" cellSpacing="0" border={0} style={{ margin: '0px', borderCollapse: 'collapse' }}>
                                  <tbody>
                                    <tr>
                                      <td style={{ padding: '0px 1px 0px 0px' }}>
                                        <p style={{ margin: '1px' }}>
                                          <img alt="Profile Picture" className="rounded-md" title="Profile Picture" width="100" height="100" src={data.profilePic} style={{ display: 'block', border: '0px', maxWidth: '100px', borderRadius: '6px' }} />
                                        </p>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            )}
                            <td valign="top" style={{ padding: '0px 12px 0px 1px', verticalAlign: 'top' }}>
                              <table cellPadding="0" cellSpacing="0" border={0} style={{ margin: '0px', borderCollapse: 'collapse' }}>
                                <tbody>
                                  <tr>
                                    <td style={{ padding: '0px 1px 0px 0px', fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '18px' }}>
                                      <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '18px', fontWeight: 700, color: '#000000', margin: '1px', whiteSpace: 'nowrap' }}>
                                        {data.name}
                                      </p>
                                      <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '19px', color: '#888888', margin: '1px' }}>
                                        {data.role}
                                      </p>
                                      <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '19px', color: '#888888', margin: '1px' }}>
                                        {data.department}
                                      </p>
                                      <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '19px', color: '#888888', margin: '1px' }}>
                                        BWSIoT
                                      </p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                            <td className="has-border" style={{ padding: '1px 0px 0px', borderRight: '1px solid #007bff' }}></td>
                            <td valign="top" style={{ padding: '0px 1px 0px 12px', verticalAlign: 'top' }}>
                              <table cellPadding="0" cellSpacing="0" border={0} style={{ margin: '0px', borderCollapse: 'collapse' }}>
                                <tbody>
                                  <tr>
                                    <td style={{ padding: '0px 1px 0px 0px' }}>
                                      <table cellPadding="0" cellSpacing="0" border={0} style={{ margin: '0px', borderCollapse: 'collapse' }}>
                                        <tbody>
                                          <tr>
                                            <td valign="middle" style={{ verticalAlign: 'middle', padding: '1px 5px 1px 0px', minWidth: '23px' }}>
                                              <p style={{ margin: '1px' }}>
                                                <img alt={data.email} width="18" height="18" src="https://b-enterprise.s3.us-east-1.amazonaws.com/public/email.png" style={{ display: 'block', border: '0px', margin: '0px', width: '18px', height: '18px' }} />
                                              </p>
                                            </td>
                                            <td style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '18px', color: '#888888', padding: '1px 0px', verticalAlign: 'middle' }}>
                                              <p style={{ margin: '1px' }}>
                                                <a href={`mailto:${data.email}`} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '18px', whiteSpace: 'nowrap', color: '#888888', textDecoration: 'none' }}>
                                                  <span style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '18px', whiteSpace: 'nowrap', color: '#888888', textDecoration: 'none' }}>{data.email}</span>
                                                </a>
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td valign="middle" style={{ verticalAlign: 'middle', padding: '1px 5px 1px 0px', minWidth: '23px' }}>
                                              <p style={{ margin: '1px' }}>
                                                <img alt={data.phone} width="18" height="18" src="https://b-enterprise.s3.us-east-1.amazonaws.com/public/phone.png" style={{ display: 'block', border: '0px', margin: '0px', width: '18px', height: '18px' }} />
                                              </p>
                                            </td>
                                            <td style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '18px', color: '#888888', padding: '1px 0px', verticalAlign: 'middle' }}>
                                              <p style={{ margin: '1px' }}>
                                                <span style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '18px', whiteSpace: 'nowrap', color: '#888888', textDecoration: 'none' }}>{data.phone}</span>
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td valign="middle" style={{ verticalAlign: 'middle', padding: '1px 5px 1px 0px', minWidth: '23px' }}>
                                              <p style={{ margin: '1px' }}>
                                                <img alt="Endereço" width="18" height="18" src="https://b-enterprise.s3.us-east-1.amazonaws.com/public/location.png" style={{ display: 'block', border: '0px', margin: '0px', width: '18px', height: '18px' }} />
                                              </p>
                                            </td>
                                            <td style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '18px', color: '#888888', padding: '1px 0px', verticalAlign: 'middle' }}>
                                              <p style={{ margin: '1px' }}>
                                                <span style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '18px', color: '#888888', textDecoration: 'none' }}>Calçada das Acácias, 31 - Alphaville Comercial</span>
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td valign="middle" style={{ padding: '1px 5px 1px 0px', verticalAlign: 'middle', minWidth: '23px' }}>
                                              <p style={{ margin: '1px' }}>
                                                <img alt="bwsiot.com" width="18" height="18" src="https://b-enterprise.s3.us-east-1.amazonaws.com/public/link.png" style={{ display: 'block', border: '0px', margin: '0px', width: '18px', height: '18px' }} />
                                              </p>
                                            </td>
                                            <td style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '18px', color: '#007bff', fontWeight: 700, padding: '1px 0px', verticalAlign: 'middle' }}>
                                              <p style={{ margin: '1px' }}>
                                                <a href="https://bwsiot.com/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '18px', whiteSpace: 'nowrap', color: '#007bff', fontWeight: 700, textDecoration: 'none' }}>
                                                  <span style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '18px', whiteSpace: 'nowrap', color: '#007bff', fontWeight: 700, textDecoration: 'none' }}>bwsiot.com</span>
                                                </a>
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td className="has-border" colSpan={4} style={{ padding: '0px 1px 10px 0px', borderBottom: '1px solid #007bff' }}></td>
                  </tr>
                  <tr>
                    <td colSpan={2} style={{ padding: '10px 1px 0px 0px' }}>
                      <table cellPadding="0" cellSpacing="0" border={0} width="100%" style={{ margin: '0px', borderCollapse: 'collapse', width: '100%' }}>
                        <tbody>
                          <tr>
                            <td width="200" style={{ padding: '10px 1px 0px 0px', width: '200px' }}>
                              <table cellPadding="0" cellSpacing="0" border={0} style={{ margin: '0px', borderCollapse: 'collapse' }}>
                                <tbody>
                                  <tr>
                                    <td style={{ padding: '0px 1px 0px 0px' }}>
                                      <p style={{ margin: '1px' }}>
                                        <a href="https://bwsiot.com/" target="_blank" rel="noopener noreferrer">
                                          <img alt="Logo" title="Logo" width="182" height="91" src="https://b-enterprise.s3.us-east-1.amazonaws.com/public/logo.png" style={{ display: 'block', border: '0px', maxWidth: '182px' }} />
                                        </a>
                                      </p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                            <td valign="bottom" align="right" style={{ padding: '10px 0px 0px 10px', verticalAlign: 'bottom' }}>
                              <table cellPadding="0" cellSpacing="0" border={0} align="right" style={{ margin: '0px', borderCollapse: 'collapse' }}>
                                <tbody>
                                  <tr>
                                    <td style={{ fontSize: '0px', lineHeight: '0px', padding: '0px 1px 0px 0px' }}>
                                      <p style={{ margin: '1px' }}>
                                        <a href="https://www.facebook.com/bwsiot" target="_blank" rel="noopener noreferrer">
                                          <img alt="Facebook" width="24" height="24" src="https://b-enterprise.s3.us-east-1.amazonaws.com/public/facebook.png" style={{ display: 'block', border: '0px', margin: '0px', width: '24px', height: '24px' }} />
                                        </a>
                                      </p>
                                    </td>
                                    <td width="3" style={{ padding: '0px 0px 1px' }}></td>
                                    <td style={{ fontSize: '0px', lineHeight: '0px', padding: '0px 1px 0px 0px' }}>
                                      <p style={{ margin: '1px' }}>
                                        <a href="https://www.linkedin.com/company/bwsiot/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
                                          <img alt="LinkedIn" width="24" height="24" src="https://b-enterprise.s3.us-east-1.amazonaws.com/public/likedin.png" style={{ display: 'block', border: '0px', margin: '0px', width: '24px', height: '24px' }} />
                                        </a>
                                      </p>
                                    </td>
                                    <td width="3" style={{ padding: '0px 0px 1px' }}></td>
                                    <td style={{ fontSize: '0px', lineHeight: '0px', padding: '0px 1px 0px 0px' }}>
                                      <p style={{ margin: '1px' }}>
                                        <a href="https://www.instagram.com/bwsiot/" target="_blank" rel="noopener noreferrer">
                                          <img alt="Instagram" width="24" height="24" src="https://b-enterprise.s3.us-east-1.amazonaws.com/public/instagram.png" style={{ display: 'block', border: '0px', margin: '0px', width: '24px', height: '24px' }} />
                                        </a>
                                      </p>
                                    </td>
                                    <td width="3" style={{ padding: '0px 0px 1px' }}></td>
                                    <td style={{ fontSize: '0px', lineHeight: '0px', padding: '0px 1px 0px 0px' }}>
                                      <p style={{ margin: '1px' }}>
                                        <a href="https://www.youtube.com/channel/UCTT2zyI52SwIlDIDHf3gdfQ" target="_blank" rel="noopener noreferrer">
                                          <img alt="YouTube" width="24" height="24" src="https://b-enterprise.s3.us-east-1.amazonaws.com/public/youtube.png" style={{ display: 'block', border: '0px', margin: '0px', width: '24px', height: '24px' }} />
                                        </a>
                                      </p>
                                    </td>
                                    <td width="3" style={{ padding: '0px 0px 1px' }}></td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* FIM DA ASSINATURA */}
          </div>
        </div>
        
        {/* Status Bar */}
        <div className="mt-8 flex items-center justify-center gap-6 text-[11px] text-slate-400 font-medium uppercase tracking-widest shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span> Sincronizado
          </div>
          <div className="flex items-center gap-2">
            Responsivo (Desktop/Mobile)
          </div>
          <div className="flex items-center gap-2">
            UTF-8 Encoded
          </div>
        </div>
      </main>
    </div>
    {imageToCrop && (
      <ImageCropper
        imageSrc={imageToCrop}
        onCropComplete={(croppedImage) => {
          setData((prev) => ({ ...prev, profilePic: croppedImage }));
          setImageToCrop(null);
        }}
        onCancel={() => setImageToCrop(null)}
      />
    )}
    </>
  );
}
