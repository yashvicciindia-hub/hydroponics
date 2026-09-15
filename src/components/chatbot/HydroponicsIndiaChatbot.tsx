import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Bot, Check, ChevronDown, Leaf, Send, Trash2, X } from 'lucide-react';
import { welcomeMessage } from '../../data/hydroponicsIndiaKnowledge';
import { ChatContext, ChatReply, getResponse, updateContext } from '../../utils/hydroponicsIndiaChatEngine';
import './hydroponicsIndiaChatbot.css';

type Message = { id: string; role: 'assistant' | 'user'; text: string; suggestions?: string[] };
const historyKey = 'hydroponicsIndia_chat_history';
const openKey = 'hydroponicsIndia_chat_open';
const initialContext: ChatContext = { currentIntent: 'greeting', recentTopics: [] };
const initialMessage = (): Message => ({ id: 'welcome', role: 'assistant', text: welcomeMessage, suggestions: ['What is HydroponicsIndia?', 'How does hydroponic farming work?', "I'm a farmer", 'What training is available?', 'How can I get technical support?', 'How does the platform help with market access?'] });

function readHistory(): Message[] { try { const saved = localStorage.getItem(historyKey); return saved ? JSON.parse(saved) : [initialMessage()]; } catch { return [initialMessage()]; } }

export default function HydroponicsIndiaChatbot() {
  const [open, setOpen] = useState(() => localStorage.getItem(openKey) === 'true');
  const [messages, setMessages] = useState<Message[]>(readHistory);
  const [context, setContext] = useState<ChatContext>(initialContext);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { localStorage.setItem(historyKey, JSON.stringify(messages)); endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
  useEffect(() => { localStorage.setItem(openKey, String(open)); }, [open]);

  const send = (value: string) => { const trimmed = value.trim(); if (!trimmed || typing) return; const reply: ChatReply = getResponse(trimmed, context); const nextContext = updateContext(context, trimmed, reply.intent); setContext(nextContext); setInput(''); setMessages((current) => [...current, { id: `${Date.now()}-user`, role: 'user', text: trimmed }]); setTyping(true); window.setTimeout(() => { setMessages((current) => [...current, { id: `${Date.now()}-assistant`, role: 'assistant', text: reply.text, suggestions: reply.suggestions }]); setTyping(false); }, 560); };
  const submit = (event: FormEvent) => { event.preventDefault(); send(input); };
  const keyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); send(input); } };
  const clear = () => { setMessages([initialMessage()]); setContext(initialContext); setConfirmClear(false); localStorage.removeItem(historyKey); };

  return <>
    {!open && <button className="hi-chat-launcher" onClick={() => setOpen(true)} aria-label="Open HydroponicsIndia Assistant"><span className="hi-launcher-pulse" /><Leaf size={25} strokeWidth={1.8} /></button>}
    {open && <section className="hi-chat-shell" aria-label="HydroponicsIndia Assistant" role="dialog">
      <header className="hi-chat-header"><div className="hi-chat-identity"><span className="hi-assistant-mark"><Leaf size={20} /></span><div><strong>HydroponicsIndia Assistant</strong><span><i /> Your guide to hydroponic farming</span></div></div><div className="hi-chat-actions"><button onClick={() => setConfirmClear(true)} aria-label="Clear conversation" title="Clear conversation"><Trash2 size={16} /></button><button onClick={() => setOpen(false)} aria-label="Close chatbot" title="Close chatbot"><X size={18} /></button></div></header>
      <div className="hi-chat-body"><div className="hi-chat-note"><Bot size={14} /> Frontend guide based on verified HydroponicsIndia information</div>{messages.map((message) => <div className={`hi-message-row ${message.role}`} key={message.id}>{message.role === 'assistant' && <span className="hi-message-icon"><Leaf size={14} /></span>}<div className="hi-message-content"><div className="hi-message-bubble">{message.text.split('\n').map((line, index) => <span key={`${message.id}-${index}`}>{line}{index < message.text.split('\n').length - 1 && <br />}</span>)}</div>{message.suggestions && <div className="hi-suggestions">{message.suggestions.map((suggestion) => <button key={suggestion} onClick={() => send(suggestion)}>{suggestion}</button>)}</div>}</div></div>)}{typing && <div className="hi-message-row assistant"><span className="hi-message-icon"><Leaf size={14} /></span><div className="hi-typing" aria-label="HydroponicsIndia Assistant is typing"><span /> <span /> <span /></div></div>}<div ref={endRef} /></div>
      <form className="hi-chat-input" onSubmit={submit}><textarea value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={keyDown} placeholder="Ask about hydroponics..." aria-label="Ask about hydroponics" rows={1} /><button type="submit" disabled={!input.trim() || typing} aria-label="Send message"><Send size={17} /></button></form>
      {confirmClear && <div className="hi-clear-confirm"><strong>Clear this conversation?</strong><span>Your saved chat history will be removed.</span><div><button onClick={() => setConfirmClear(false)}>Cancel</button><button className="danger" onClick={clear}><Check size={14} /> Clear</button></div></div>}
      <button className="hi-mobile-close" onClick={() => setOpen(false)} aria-label="Minimize chatbot"><ChevronDown size={18} /></button>
    </section>}
  </>;
}