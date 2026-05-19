import { useState, useEffect, useRef } from "react";

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Arc Floor Lamp",
    category: "Floor",
    price: 349,
    description: "Sculptural arc design with a matte black finish. Adjustable arm, 180cm height.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80",
    stock: 12,
    sku: "ML-ARC-001",
    weight: "4.2kg",
    dimensions: "30×30×180cm",
  },
  {
    id: 2,
    name: "Pendant Cluster",
    category: "Pendant",
    price: 289,
    description: "Five-globe pendant cluster, warm Edison bulbs included. Canopy adjustable.",
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&q=80",
    stock: 8,
    sku: "ML-PND-002",
    weight: "2.1kg",
    dimensions: "60×60×120cm",
  },
  {
    id: 3,
    name: "Outdoor Wall Sconce",
    category: "Outdoor",
    price: 195,
    description: "IP65-rated aluminum wall sconce. Suitable for covered patios and entryways.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    stock: 20,
    sku: "ML-OUT-003",
    weight: "1.4kg",
    dimensions: "15×12×25cm",
  },
  {
    id: 4,
    name: "Table Lamp Duo",
    category: "Table",
    price: 220,
    description: "Concrete base with linen shade. Minimalist silhouette, perfect bedside companion.",
    image: "https://images.unsplash.com/photo-1543488702-a7c8c1f80c08?w=600&q=80",
    stock: 15,
    sku: "ML-TBL-004",
    weight: "2.8kg",
    dimensions: "20×20×55cm",
  },
  {
    id: 5,
    name: "Track Rail System",
    category: "Ceiling",
    price: 415,
    description: "3-meter adjustable track system with three directional spotlights. Matte white.",
    image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&q=80",
    stock: 6,
    sku: "ML-TRK-005",
    weight: "3.5kg",
    dimensions: "300×8×10cm",
  },
  {
    id: 6,
    name: "Garden Path Light",
    category: "Outdoor",
    price: 89,
    description: "Solar-powered path stake. Frosted diffuser, auto dusk-to-dawn activation.",
    image: "https://images.unsplash.com/photo-1416339442236-8ceb164046f8?w=600&q=80",
    stock: 40,
    sku: "ML-SOL-006",
    weight: "0.6kg",
    dimensions: "10×10×60cm",
  },
];

const GMAIL_ADDRESS = "your.gmail@gmail.com";

const US_STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC"];

function formatPrice(n) { return `$${n.toLocaleString()}`; }

function ImageUpload({ value, onChange, label }) {
  const ref = useRef();
  const [preview, setPreview] = useState(value || "");

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreview(ev.target.result);
      onChange(ev.target.result);
    };
    reader.readAsDataURL(file);
  }

  function handleUrl(e) {
    setPreview(e.target.value);
    onChange(e.target.value);
  }

  return (
    <div style={{marginBottom:16}}>
      <label style={{display:"block",fontSize:12,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",color:"#888",marginBottom:8}}>{label}</label>
      {preview && (
        <div style={{marginBottom:10,borderRadius:8,overflow:"hidden",height:140,background:"#111"}}>
          <img src={preview} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={()=>setPreview("")}/>
        </div>
      )}
      <div style={{display:"flex",gap:8,flexDirection:"column"}}>
        <input type="text" placeholder="Paste image URL…" value={value||""} onChange={handleUrl}
          style={{background:"#1a1a1a",border:"1px solid #333",borderRadius:6,padding:"8px 12px",color:"#fff",fontSize:13,outline:"none"}}/>
        <label style={{cursor:"pointer",display:"inline-flex",alignItems:"center",gap:8,fontSize:13,color:"#aaa",padding:"8px 12px",background:"#1a1a1a",border:"1px solid #333",borderRadius:6}}>
          <span>📁</span> Or upload from device
          <input type="file" accept="image/*" ref={ref} onChange={handleFile} style={{display:"none"}}/>
        </label>
      </div>
    </div>
  );
}

function StarRating({ rating = 4.5 }) {
  return (
    <div style={{display:"flex",gap:2,alignItems:"center"}}>
      {[1,2,3,4,5].map(s => (
        <svg key={s} width="12" height="12" viewBox="0 0 12 12">
          <polygon points="6,1 7.5,4.5 11,5 8.5,7.3 9.2,11 6,9.2 2.8,11 3.5,7.3 1,5 4.5,4.5"
            fill={s <= Math.floor(rating) ? "#F5A623" : s - 0.5 <= rating ? "#F5A623" : "#333"}
            stroke="#F5A623" strokeWidth="0.5"/>
        </svg>
      ))}
      <span style={{fontSize:11,color:"#888",marginLeft:4}}>{rating}</span>
    </div>
  );
}

function ProductCard({ product, onAddToCart, onEdit, isAdmin }) {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
      style={{background:"#111",border:`1px solid ${hover?"#444":"#222"}`,borderRadius:12,overflow:"hidden",transition:"all 0.25s",transform:hover?"translateY(-4px)":"none",display:"flex",flexDirection:"column"}}>
      <div style={{position:"relative",height:220,overflow:"hidden",background:"#0a0a0a"}}>
        <img src={product.image} alt={product.name} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.4s",transform:hover?"scale(1.05)":"scale(1)"}} onError={e=>e.target.src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80"}/>
        <div style={{position:"absolute",top:12,left:12}}>
          <span style={{background:"#000",color:"#888",fontSize:10,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",padding:"4px 10px",borderRadius:20,border:"1px solid #333"}}>{product.category}</span>
        </div>
        {product.stock < 5 && (
          <div style={{position:"absolute",top:12,right:12}}>
            <span style={{background:"#7c2d12",color:"#fca5a5",fontSize:10,fontWeight:600,padding:"4px 10px",borderRadius:20}}>Low Stock</span>
          </div>
        )}
        {isAdmin && (
          <button onClick={()=>onEdit(product)} style={{position:"absolute",bottom:12,right:12,background:"rgba(0,0,0,0.8)",border:"1px solid #444",color:"#fff",borderRadius:8,padding:"6px 12px",fontSize:12,cursor:"pointer"}}>Edit</button>
        )}
      </div>
      <div style={{padding:"16px 20px",flex:1,display:"flex",flexDirection:"column"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
          <h3 style={{margin:0,fontSize:15,fontWeight:600,color:"#fff",fontFamily:"'Cormorant Garamond',Georgia,serif",lineHeight:1.3}}>{product.name}</h3>
          <span style={{fontSize:16,fontWeight:700,color:"#fff",whiteSpace:"nowrap",marginLeft:12}}>{formatPrice(product.price)}</span>
        </div>
        <StarRating rating={4.5}/>
        <p style={{fontSize:13,color:"#666",margin:"10px 0 0",lineHeight:1.6,flex:1}}>{product.description}</p>
        <div style={{marginTop:16,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:11,color:"#555"}}>SKU: {product.sku}</span>
          <span style={{fontSize:11,color:product.stock > 10 ? "#4ade80" : product.stock > 0 ? "#fbbf24" : "#f87171"}}>{product.stock} in stock</span>
        </div>
        <button onClick={()=>onAddToCart(product)}
          style={{marginTop:14,width:"100%",padding:"11px",background:product.stock === 0 ? "#222" : hover ? "#fff" : "#1a1a1a",color:product.stock === 0 ? "#555" : hover ? "#000" : "#fff",border:`1px solid ${product.stock === 0 ? "#333" : "#555"}`,borderRadius:8,fontSize:13,fontWeight:600,letterSpacing:"0.05em",cursor:product.stock === 0 ? "not-allowed" : "pointer",transition:"all 0.2s"}}>
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

function Cart({ items, onRemove, onUpdateQty, onCheckout, onClose }) {
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = total > 500 ? 0 : 35;
  return (
    <div style={{position:"fixed",top:0,right:0,width:420,height:"100%",background:"#0d0d0d",borderLeft:"1px solid #222",zIndex:1000,display:"flex",flexDirection:"column",boxShadow:"-20px 0 60px rgba(0,0,0,0.8)"}}>
      <div style={{padding:"24px 28px",borderBottom:"1px solid #222",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <h2 style={{margin:0,fontSize:18,fontWeight:700,color:"#fff",fontFamily:"'Cormorant Garamond',Georgia,serif"}}>Cart ({items.length})</h2>
        <button onClick={onClose} style={{background:"none",border:"none",color:"#888",cursor:"pointer",fontSize:22,lineHeight:1}}>✕</button>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"20px 28px"}}>
        {items.length === 0 && <p style={{color:"#555",textAlign:"center",marginTop:60}}>Your cart is empty</p>}
        {items.map(item => (
          <div key={item.id} style={{display:"flex",gap:14,marginBottom:20,paddingBottom:20,borderBottom:"1px solid #1a1a1a"}}>
            <div style={{width:64,height:64,borderRadius:8,overflow:"hidden",flexShrink:0,background:"#111"}}>
              <img src={item.image} alt={item.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            </div>
            <div style={{flex:1}}>
              <p style={{margin:"0 0 4px",fontSize:13,fontWeight:600,color:"#ddd"}}>{item.name}</p>
              <p style={{margin:0,fontSize:13,color:"#888"}}>{formatPrice(item.price)}</p>
              <div style={{display:"flex",alignItems:"center",gap:10,marginTop:8}}>
                <button onClick={()=>onUpdateQty(item.id, item.qty-1)} style={{width:24,height:24,background:"#1a1a1a",border:"1px solid #333",color:"#fff",borderRadius:4,cursor:"pointer",fontSize:14,lineHeight:1}}>−</button>
                <span style={{fontSize:13,color:"#fff",minWidth:16,textAlign:"center"}}>{item.qty}</span>
                <button onClick={()=>onUpdateQty(item.id, item.qty+1)} style={{width:24,height:24,background:"#1a1a1a",border:"1px solid #333",color:"#fff",borderRadius:4,cursor:"pointer",fontSize:14,lineHeight:1}}>+</button>
                <button onClick={()=>onRemove(item.id)} style={{marginLeft:"auto",background:"none",border:"none",color:"#555",cursor:"pointer",fontSize:13}}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {items.length > 0 && (
        <div style={{padding:"20px 28px",borderTop:"1px solid #222"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
            <span style={{fontSize:13,color:"#888"}}>Subtotal</span>
            <span style={{fontSize:13,color:"#ddd"}}>{formatPrice(total)}</span>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}>
            <span style={{fontSize:13,color:"#888"}}>Shipping</span>
            <span style={{fontSize:13,color: shipping === 0 ? "#4ade80" : "#ddd"}}>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:20,paddingTop:12,borderTop:"1px solid #222"}}>
            <span style={{fontSize:15,fontWeight:700,color:"#fff"}}>Total</span>
            <span style={{fontSize:15,fontWeight:700,color:"#fff"}}>{formatPrice(total + shipping)}</span>
          </div>
          {shipping > 0 && <p style={{fontSize:11,color:"#555",marginBottom:16,textAlign:"center"}}>Free shipping on orders over $500</p>}
          <button onClick={onCheckout} style={{width:"100%",padding:14,background:"#fff",color:"#000",border:"none",borderRadius:8,fontSize:14,fontWeight:700,letterSpacing:"0.06em",cursor:"pointer"}}>Checkout →</button>
        </div>
      )}
    </div>
  );
}

function CheckoutForm({ cart, onSuccess, onBack }) {
  const [form, setForm] = useState({ firstName:"", lastName:"", email:"", phone:"", address:"", city:"", state:"", zip:"", country:"US", notes:"", shippingMethod:"standard" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shippingCost = form.shippingMethod === "express" ? 65 : form.shippingMethod === "overnight" ? 120 : subtotal > 500 ? 0 : 35;
  const total = subtotal + shippingCost;

  const shippingOptions = [
    { id:"standard", label:"Standard (5–7 days)", price: subtotal > 500 ? 0 : 35 },
    { id:"express", label:"Express (2–3 days)", price: 65 },
    { id:"overnight", label:"Overnight (next day)", price: 120 },
  ];

  function set(k, v) { setForm(f => ({...f, [k]:v})); }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const orderNum = "ML-" + Date.now().toString().slice(-6);
    const orderDate = new Date().toLocaleString();
    const itemList = cart.map(i => `• ${i.name} (${i.qty}x) — ${formatPrice(i.price * i.qty)}`).join("\n");

    const emailBody = `
NEW ORDER — MONO LIGHTING
════════════════════════════════
Order #: ${orderNum}
Date: ${orderDate}

CUSTOMER
Name: ${form.firstName} ${form.lastName}
Email: ${form.email}
Phone: ${form.phone || "N/A"}

SHIPPING ADDRESS
${form.address}
${form.city}, ${form.state} ${form.zip}
${form.country}

SHIPPING METHOD: ${shippingOptions.find(s=>s.id===form.shippingMethod)?.label}

ITEMS
${itemList}

SUBTOTAL: ${formatPrice(subtotal)}
SHIPPING: ${shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}
TOTAL: ${formatPrice(total)}

NOTES: ${form.notes || "None"}
════════════════════════════════
    `.trim();

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:500,
          messages:[{
            role:"user",
            content:`A customer just placed an order on MONO LIGHTING. Here are the details:\n\n${emailBody}\n\nPlease confirm this order has been received and provide a friendly confirmation message to show the customer (2-3 sentences, mention order number ${orderNum}).`
          }]
        })
      });
      const data = await res.json();
      const confirmMsg = data.content?.[0]?.text || `Thank you for your order! Your order #${orderNum} has been received and will be processed shortly.`;
      setStatus("success");
      onSuccess({ orderNum, form, total, confirmMsg, emailBody, cart });
    } catch(err) {
      setStatus("idle");
      setError("Something went wrong. Please try again.");
    }
  }

  const inputStyle = {background:"#111",border:"1px solid #2a2a2a",borderRadius:8,padding:"10px 14px",color:"#fff",fontSize:13,outline:"none",width:"100%",boxSizing:"border-box"};
  const labelStyle = {display:"block",fontSize:11,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",color:"#666",marginBottom:6};

  return (
    <div style={{maxWidth:700,margin:"0 auto",padding:"40px 24px"}}>
      <button onClick={onBack} style={{background:"none",border:"none",color:"#666",cursor:"pointer",fontSize:13,marginBottom:24,display:"flex",alignItems:"center",gap:6}}>← Back to Cart</button>
      <h2 style={{margin:"0 0 32px",fontSize:28,fontWeight:300,color:"#fff",fontFamily:"'Cormorant Garamond',Georgia,serif",letterSpacing:"0.04em"}}>Checkout</h2>

      <form onSubmit={handleSubmit}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginBottom:32}}>
          <div>
            <h3 style={{margin:"0 0 20px",fontSize:14,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:"#888"}}>Contact</h3>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
              <div><label style={labelStyle}>First Name</label><input required value={form.firstName} onChange={e=>set("firstName",e.target.value)} style={inputStyle}/></div>
              <div><label style={labelStyle}>Last Name</label><input required value={form.lastName} onChange={e=>set("lastName",e.target.value)} style={inputStyle}/></div>
            </div>
            <div style={{marginBottom:12}}><label style={labelStyle}>Email</label><input required type="email" value={form.email} onChange={e=>set("email",e.target.value)} style={inputStyle}/></div>
            <div><label style={labelStyle}>Phone</label><input value={form.phone} onChange={e=>set("phone",e.target.value)} style={inputStyle}/></div>
          </div>

          <div>
            <h3 style={{margin:"0 0 20px",fontSize:14,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:"#888"}}>Shipping Address</h3>
            <div style={{marginBottom:12}}><label style={labelStyle}>Street Address</label><input required value={form.address} onChange={e=>set("address",e.target.value)} style={inputStyle}/></div>
            <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:12,marginBottom:12}}>
              <div><label style={labelStyle}>City</label><input required value={form.city} onChange={e=>set("city",e.target.value)} style={inputStyle}/></div>
              <div><label style={labelStyle}>State</label>
                <select required value={form.state} onChange={e=>set("state",e.target.value)} style={{...inputStyle}}>
                  <option value="">—</option>
                  {US_STATES.map(s=><option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div><label style={labelStyle}>ZIP Code</label><input required value={form.zip} onChange={e=>set("zip",e.target.value)} style={{...inputStyle,maxWidth:140}}/></div>
          </div>
        </div>

        <div style={{marginBottom:28}}>
          <h3 style={{margin:"0 0 16px",fontSize:14,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:"#888"}}>Shipping Method</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
            {shippingOptions.map(opt => (
              <label key={opt.id} style={{cursor:"pointer",display:"block",padding:"16px",background:form.shippingMethod===opt.id?"#1a1a1a":"#0d0d0d",border:`1px solid ${form.shippingMethod===opt.id?"#555":"#222"}`,borderRadius:10,transition:"all 0.2s"}}>
                <input type="radio" value={opt.id} checked={form.shippingMethod===opt.id} onChange={()=>set("shippingMethod",opt.id)} style={{display:"none"}}/>
                <p style={{margin:"0 0 6px",fontSize:12,fontWeight:600,color:form.shippingMethod===opt.id?"#fff":"#888"}}>{opt.label.split("(")[0].trim()}</p>
                <p style={{margin:"0 0 6px",fontSize:11,color:"#555"}}>{opt.label.match(/\((.+)\)/)?.[1]}</p>
                <p style={{margin:0,fontSize:14,fontWeight:700,color:opt.price===0?"#4ade80":"#fff"}}>{opt.price===0?"FREE":formatPrice(opt.price)}</p>
              </label>
            ))}
          </div>
        </div>

        <div style={{marginBottom:28}}>
          <label style={labelStyle}>Order Notes (optional)</label>
          <textarea value={form.notes} onChange={e=>set("notes",e.target.value)} rows={3} placeholder="Special instructions, delivery notes…" style={{...inputStyle,resize:"vertical"}}/>
        </div>

        <div style={{background:"#111",border:"1px solid #222",borderRadius:12,padding:"20px 24px",marginBottom:24}}>
          <h3 style={{margin:"0 0 16px",fontSize:14,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:"#888"}}>Order Summary</h3>
          {cart.map(i=>(
            <div key={i.id} style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
              <span style={{fontSize:13,color:"#aaa"}}>{i.name} ×{i.qty}</span>
              <span style={{fontSize:13,color:"#ddd"}}>{formatPrice(i.price*i.qty)}</span>
            </div>
          ))}
          <div style={{borderTop:"1px solid #222",marginTop:12,paddingTop:12}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <span style={{fontSize:13,color:"#666"}}>Shipping</span>
              <span style={{fontSize:13,color:shippingCost===0?"#4ade80":"#ddd"}}>{shippingCost===0?"FREE":formatPrice(shippingCost)}</span>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:8}}>
              <span style={{fontSize:16,fontWeight:700,color:"#fff"}}>Total</span>
              <span style={{fontSize:16,fontWeight:700,color:"#fff"}}>{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        {error && <p style={{color:"#f87171",fontSize:13,marginBottom:16}}>{error}</p>}

        <button type="submit" disabled={status==="loading"} style={{width:"100%",padding:"16px",background:status==="loading"?"#222":"#fff",color:status==="loading"?"#555":"#000",border:"none",borderRadius:10,fontSize:14,fontWeight:700,letterSpacing:"0.06em",cursor:status==="loading"?"not-allowed":"pointer",transition:"all 0.2s"}}>
          {status==="loading" ? "Processing…" : `Place Order — ${formatPrice(total)}`}
        </button>
        <p style={{fontSize:11,color:"#444",textAlign:"center",marginTop:12}}>Order confirmation will be sent to {GMAIL_ADDRESS}</p>
      </form>
    </div>
  );
}

function OrderSuccess({ order }) {
  return (
    <div style={{maxWidth:600,margin:"80px auto",padding:"0 24px",textAlign:"center"}}>
      <div style={{width:64,height:64,borderRadius:"50%",background:"#14532d",border:"1px solid #4ade80",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px",fontSize:24}}>✓</div>
      <h2 style={{margin:"0 0 12px",fontSize:32,fontWeight:300,color:"#fff",fontFamily:"'Cormorant Garamond',Georgia,serif"}}>Order Confirmed</h2>
      <p style={{fontSize:14,color:"#888",marginBottom:8}}>Order #{order.orderNum}</p>
      <p style={{fontSize:13,color:"#666",marginBottom:32,lineHeight:1.7}}>{order.confirmMsg}</p>

      <div style={{background:"#0d0d0d",border:"1px solid #1a1a1a",borderRadius:12,padding:"24px",textAlign:"left",marginBottom:24}}>
        <h3 style={{margin:"0 0 16px",fontSize:12,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:"#555"}}>Shipping Details</h3>
        <p style={{margin:"0 0 4px",fontSize:14,color:"#ddd"}}>{order.form.firstName} {order.form.lastName}</p>
        <p style={{margin:"0 0 4px",fontSize:13,color:"#888"}}>{order.form.address}</p>
        <p style={{margin:0,fontSize:13,color:"#888"}}>{order.form.city}, {order.form.state} {order.form.zip}</p>
      </div>

      <div style={{background:"#0a1a0a",border:"1px solid #1a3a1a",borderRadius:12,padding:"16px 24px",textAlign:"left",marginBottom:32}}>
        <p style={{margin:0,fontSize:13,color:"#6ee7b7",lineHeight:1.7}}>📧 Order details have been sent to <strong>{GMAIL_ADDRESS}</strong> for fulfillment. You'll receive a shipping confirmation once dispatched.</p>
      </div>

      <button onClick={()=>window.location.reload()} style={{padding:"12px 32px",background:"none",border:"1px solid #444",color:"#fff",borderRadius:8,fontSize:13,cursor:"pointer",letterSpacing:"0.05em"}}>Continue Shopping</button>
    </div>
  );
}

function AdminPanel({ products, setProducts, onClose }) {
  const [editing, setEditing] = useState(null);
  const [orders, setOrders] = useState([]);
  const [tab, setTab] = useState("products");
  const EMPTY = { id:null,name:"",category:"Floor",price:"",description:"",image:"",stock:"",sku:"",weight:"",dimensions:"" };
  const [form, setForm] = useState(EMPTY);

  function setF(k,v){ setForm(f=>({...f,[k]:v})); }

  function startNew() { setForm({...EMPTY,id:Date.now()}); setEditing("new"); }
  function startEdit(p) { setForm({...p,price:String(p.price),stock:String(p.stock)}); setEditing(p.id); }

  function save() {
    const p = {...form, price:Number(form.price), stock:Number(form.stock)};
    if (editing === "new") setProducts(prev=>[...prev,p]);
    else setProducts(prev=>prev.map(x=>x.id===p.id?p:x));
    setEditing(null); setForm(EMPTY);
  }

  function remove(id) { if(confirm("Delete this product?")) setProducts(prev=>prev.filter(x=>x.id!==id)); }

  const inputStyle = {background:"#1a1a1a",border:"1px solid #2a2a2a",borderRadius:8,padding:"10px 14px",color:"#fff",fontSize:13,outline:"none",width:"100%",boxSizing:"border-box"};
  const labelStyle = {display:"block",fontSize:11,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",color:"#666",marginBottom:6};

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.95)",zIndex:2000,overflowY:"auto"}}>
      <div style={{maxWidth:900,margin:"0 auto",padding:"40px 24px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:32}}>
          <h2 style={{margin:0,fontSize:24,fontWeight:300,color:"#fff",fontFamily:"'Cormorant Garamond',Georgia,serif",letterSpacing:"0.06em"}}>Admin Panel</h2>
          <button onClick={onClose} style={{background:"none",border:"1px solid #333",color:"#888",borderRadius:8,padding:"8px 16px",cursor:"pointer",fontSize:13}}>← Back to Store</button>
        </div>

        <div style={{display:"flex",gap:8,marginBottom:28}}>
          {["products","add"].map(t=>(
            <button key={t} onClick={()=>{setTab(t);if(t==="add"){startNew();}}} style={{padding:"8px 20px",background:tab===t?"#fff":"#111",color:tab===t?"#000":"#888",border:`1px solid ${tab===t?"#fff":"#333"}`,borderRadius:8,fontSize:13,cursor:"pointer",fontWeight:600,letterSpacing:"0.05em",textTransform:"capitalize"}}>
              {t === "add" ? "+ New Product" : "Products"}
            </button>
          ))}
        </div>

        {tab === "products" && (
          <div>
            <div style={{display:"grid",gap:12}}>
              {products.map(p=>(
                <div key={p.id} style={{display:"flex",alignItems:"center",gap:16,background:"#111",border:"1px solid #1a1a1a",borderRadius:10,padding:"16px 20px"}}>
                  <img src={p.image} alt={p.name} style={{width:56,height:56,borderRadius:8,objectFit:"cover",background:"#0a0a0a"}} onError={e=>e.target.src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56'%3E%3Crect fill='%23222'/%3E%3C/svg%3E"}/>
                  <div style={{flex:1}}>
                    <p style={{margin:"0 0 4px",fontSize:14,fontWeight:600,color:"#fff"}}>{p.name}</p>
                    <p style={{margin:0,fontSize:12,color:"#666"}}>{p.sku} · {p.category} · ${p.price} · {p.stock} in stock</p>
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <button onClick={()=>{setEditing(p.id);setForm({...p,price:String(p.price),stock:String(p.stock)});setTab("add");}} style={{padding:"6px 14px",background:"#1a1a1a",border:"1px solid #333",color:"#ddd",borderRadius:6,fontSize:12,cursor:"pointer"}}>Edit</button>
                    <button onClick={()=>remove(p.id)} style={{padding:"6px 14px",background:"#1a1a1a",border:"1px solid #333",color:"#f87171",borderRadius:6,fontSize:12,cursor:"pointer"}}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "add" && (
          <div style={{background:"#111",border:"1px solid #1a1a1a",borderRadius:12,padding:"28px"}}>
            <h3 style={{margin:"0 0 24px",fontSize:16,color:"#fff",fontWeight:600}}>{editing && editing !== "new" ? "Edit Product" : "New Product"}</h3>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
              <div><label style={labelStyle}>Product Name</label><input value={form.name} onChange={e=>setF("name",e.target.value)} style={inputStyle}/></div>
              <div><label style={labelStyle}>Category</label>
                <select value={form.category} onChange={e=>setF("category",e.target.value)} style={inputStyle}>
                  {["Floor","Pendant","Outdoor","Table","Ceiling","Wall","Other"].map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
              <div><label style={labelStyle}>Price ($)</label><input type="number" value={form.price} onChange={e=>setF("price",e.target.value)} style={inputStyle}/></div>
              <div><label style={labelStyle}>Stock Qty</label><input type="number" value={form.stock} onChange={e=>setF("stock",e.target.value)} style={inputStyle}/></div>
              <div><label style={labelStyle}>SKU</label><input value={form.sku} onChange={e=>setF("sku",e.target.value)} style={inputStyle}/></div>
              <div><label style={labelStyle}>Weight</label><input value={form.weight} onChange={e=>setF("weight",e.target.value)} placeholder="e.g. 2.1kg" style={inputStyle}/></div>
              <div><label style={labelStyle}>Dimensions</label><input value={form.dimensions} onChange={e=>setF("dimensions",e.target.value)} placeholder="e.g. 30×30×180cm" style={inputStyle}/></div>
            </div>
            <div style={{marginBottom:16}}><label style={labelStyle}>Description</label><textarea value={form.description} onChange={e=>setF("description",e.target.value)} rows={3} style={{...inputStyle,resize:"vertical"}}/></div>
            <ImageUpload value={form.image} onChange={v=>setF("image",v)} label="Product Image"/>
            <div style={{display:"flex",gap:12,marginTop:8}}>
              <button onClick={save} style={{padding:"12px 28px",background:"#fff",color:"#000",border:"none",borderRadius:8,fontSize:13,fontWeight:700,cursor:"pointer"}}>Save Product</button>
              <button onClick={()=>{setEditing(null);setForm(EMPTY);setTab("products");}} style={{padding:"12px 28px",background:"none",border:"1px solid #333",color:"#888",borderRadius:8,fontSize:13,cursor:"pointer"}}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ShippingDashboard({ onClose }) {
  const [orders] = useState([
    { id:"ML-847291", customer:"Emily Harrington", items:"Arc Floor Lamp ×1", total:349, date:"2025-05-18", status:"pending", address:"42 Beacon St, Boston MA 02108", method:"Standard" },
    { id:"ML-847115", customer:"James Okafor", items:"Pendant Cluster ×2", total:578, date:"2025-05-17", status:"shipped", address:"881 N Michigan Ave, Chicago IL 60611", method:"Express", tracking:"1Z999AA10123456784" },
    { id:"ML-846803", customer:"Sofia Reyes", items:"Outdoor Wall Sconce ×3, Garden Path Light ×6", total:1119, date:"2025-05-16", status:"delivered", address:"1 Market St, San Francisco CA 94105", method:"Standard", tracking:"1Z999AA10123456123" },
    { id:"ML-846540", customer:"Liam Thornton", items:"Track Rail System ×1", total:415, date:"2025-05-15", status:"processing", address:"350 5th Ave, New York NY 10118", method:"Overnight" },
  ]);
  const [selected, setSelected] = useState(null);

  const statusColor = {pending:"#fbbf24",processing:"#60a5fa",shipped:"#a78bfa",delivered:"#4ade80"};
  const statusBg = {pending:"#1c1200",processing:"#0c1a2e",shipped:"#1a1030",delivered:"#052e16"};

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.95)",zIndex:2000,overflowY:"auto"}}>
      <div style={{maxWidth:900,margin:"0 auto",padding:"40px 24px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:32}}>
          <div>
            <h2 style={{margin:"0 0 4px",fontSize:24,fontWeight:300,color:"#fff",fontFamily:"'Cormorant Garamond',Georgia,serif"}}>Shipping Dashboard</h2>
            <p style={{margin:0,fontSize:13,color:"#555"}}>Manage fulfillment and track deliveries</p>
          </div>
          <button onClick={onClose} style={{background:"none",border:"1px solid #333",color:"#888",borderRadius:8,padding:"8px 16px",cursor:"pointer",fontSize:13}}>← Back to Store</button>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:32}}>
          {[{label:"Pending",count:1,color:"#fbbf24"},{label:"Processing",count:1,color:"#60a5fa"},{label:"Shipped",count:1,color:"#a78bfa"},{label:"Delivered",count:1,color:"#4ade80"}].map(s=>(
            <div key={s.label} style={{background:"#111",border:"1px solid #1a1a1a",borderRadius:10,padding:"16px 20px"}}>
              <p style={{margin:"0 0 8px",fontSize:11,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:"#555"}}>{s.label}</p>
              <p style={{margin:0,fontSize:28,fontWeight:300,color:s.color,fontFamily:"'Cormorant Garamond',Georgia,serif"}}>{s.count}</p>
            </div>
          ))}
        </div>

        <div style={{display:"grid",gap:10}}>
          {orders.map(o=>(
            <div key={o.id} onClick={()=>setSelected(selected?.id===o.id?null:o)} style={{background:"#111",border:`1px solid ${selected?.id===o.id?"#333":"#1a1a1a"}`,borderRadius:10,padding:"16px 20px",cursor:"pointer",transition:"all 0.2s"}}>
              <div style={{display:"flex",alignItems:"center",gap:16}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:4}}>
                    <span style={{fontSize:14,fontWeight:600,color:"#fff"}}>{o.id}</span>
                    <span style={{fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20,background:statusBg[o.status],color:statusColor[o.status],textTransform:"capitalize"}}>{o.status}</span>
                  </div>
                  <p style={{margin:0,fontSize:13,color:"#888"}}>{o.customer} · {o.items}</p>
                </div>
                <div style={{textAlign:"right"}}>
                  <p style={{margin:"0 0 4px",fontSize:14,fontWeight:700,color:"#fff"}}>{formatPrice(o.total)}</p>
                  <p style={{margin:0,fontSize:11,color:"#555"}}>{o.date}</p>
                </div>
              </div>
              {selected?.id===o.id && (
                <div style={{marginTop:16,paddingTop:16,borderTop:"1px solid #1a1a1a",display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                  <div>
                    <p style={{margin:"0 0 6px",fontSize:11,color:"#555",textTransform:"uppercase",letterSpacing:"0.08em"}}>Ship To</p>
                    <p style={{margin:0,fontSize:13,color:"#bbb"}}>{o.address}</p>
                    <p style={{margin:"8px 0 0",fontSize:13,color:"#888"}}>Method: {o.method}</p>
                  </div>
                  <div>
                    {o.tracking && (<><p style={{margin:"0 0 6px",fontSize:11,color:"#555",textTransform:"uppercase",letterSpacing:"0.08em"}}>Tracking</p><p style={{margin:"0 0 12px",fontSize:12,fontFamily:"monospace",color:"#60a5fa"}}>{o.tracking}</p></>)}
                    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                      {o.status==="pending" && <button style={{padding:"7px 14px",background:"#1a3a1a",border:"1px solid #2d5a2d",color:"#4ade80",borderRadius:6,fontSize:12,cursor:"pointer",fontWeight:600}}>Mark Processing</button>}
                      {o.status==="processing" && <button style={{padding:"7px 14px",background:"#1a1030",border:"1px solid #3d2a80",color:"#a78bfa",borderRadius:6,fontSize:12,cursor:"pointer",fontWeight:600}}>Mark Shipped</button>}
                      <button style={{padding:"7px 14px",background:"#1a1a1a",border:"1px solid #333",color:"#ddd",borderRadius:6,fontSize:12,cursor:"pointer"}}>Print Label</button>
                      <button style={{padding:"7px 14px",background:"#1a1a1a",border:"1px solid #333",color:"#ddd",borderRadius:6,fontSize:12,cursor:"pointer"}}>Email Customer</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MonoLighting() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [view, setView] = useState("shop"); // shop | checkout | success | admin | shipping
  const [successData, setSuccessData] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [adminOpen, setAdminOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [adminCode, setAdminCode] = useState("");
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [sort, setSort] = useState("default");

  const categories = ["All", ...Array.from(new Set(products.map(p=>p.category)))];

  const filtered = products
    .filter(p => (filter === "All" || p.category === filter) && (!search || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase())))
    .sort((a,b) => sort==="price-asc" ? a.price-b.price : sort==="price-desc" ? b.price-a.price : sort==="name" ? a.name.localeCompare(b.name) : 0);

  function addToCart(product) {
    setCart(prev => {
      const ex = prev.find(i=>i.id===product.id);
      if (ex) return prev.map(i=>i.id===product.id ? {...i,qty:i.qty+1} : i);
      return [...prev, {...product,qty:1}];
    });
    setCartOpen(true);
  }

  function removeFromCart(id) { setCart(prev=>prev.filter(i=>i.id!==id)); }
  function updateQty(id, qty) { if(qty<1) removeFromCart(id); else setCart(prev=>prev.map(i=>i.id===id?{...i,qty}:i)); }

  const cartCount = cart.reduce((s,i)=>s+i.qty,0);

  function handleAdminAccess() {
    if (adminCode === "mono2024") { setAdminOpen(true); setShowAdminPrompt(false); setAdminCode(""); }
    else alert("Incorrect code");
  }

  return (
    <div style={{minHeight:"100vh",background:"#080808",color:"#fff",fontFamily:"'DM Sans','Helvetica Neue',sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/>

      {adminOpen && <AdminPanel products={products} setProducts={setProducts} onClose={()=>setAdminOpen(false)}/>}
      {shippingOpen && <ShippingDashboard onClose={()=>setShippingOpen(false)}/>}

      {/* Header */}
      <header style={{position:"sticky",top:0,zIndex:100,background:"rgba(8,8,8,0.95)",backdropFilter:"blur(20px)",borderBottom:"1px solid #141414"}}>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"0 32px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:32}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:28,height:28,borderRadius:"50%",border:"1.5px solid #fff",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:"#fff"}}/>
              </div>
              <span style={{fontSize:15,fontWeight:600,letterSpacing:"0.2em",textTransform:"uppercase",color:"#fff"}}>MONO LIGHTING</span>
            </div>
          </div>
          <nav style={{display:"flex",alignItems:"center",gap:8}}>
            <button onClick={()=>setShippingOpen(true)} style={{background:"none",border:"1px solid #222",color:"#888",borderRadius:8,padding:"7px 14px",cursor:"pointer",fontSize:12,letterSpacing:"0.05em"}}>📦 Shipping</button>
            <button onClick={()=>setShowAdminPrompt(p=>!p)} style={{background:"none",border:"1px solid #222",color:"#888",borderRadius:8,padding:"7px 14px",cursor:"pointer",fontSize:12,letterSpacing:"0.05em"}}>⚙ Admin</button>
            <button onClick={()=>setCartOpen(p=>!p)} style={{position:"relative",background:"#111",border:"1px solid #333",color:"#fff",borderRadius:8,padding:"7px 18px",cursor:"pointer",fontSize:13,fontWeight:600,display:"flex",alignItems:"center",gap:8}}>
              🛒 Cart {cartCount > 0 && <span style={{background:"#fff",color:"#000",borderRadius:"50%",width:18,height:18,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700}}>{cartCount}</span>}
            </button>
          </nav>
        </div>
        {showAdminPrompt && (
          <div style={{background:"#111",borderTop:"1px solid #1a1a1a",padding:"12px 32px",display:"flex",gap:10,alignItems:"center",justifyContent:"flex-end"}}>
            <input type="password" value={adminCode} onChange={e=>setAdminCode(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleAdminAccess()} placeholder="Admin code…" style={{background:"#0d0d0d",border:"1px solid #2a2a2a",borderRadius:6,padding:"7px 12px",color:"#fff",fontSize:13,outline:"none",width:180}}/>
            <button onClick={handleAdminAccess} style={{padding:"7px 16px",background:"#fff",color:"#000",border:"none",borderRadius:6,fontSize:12,fontWeight:600,cursor:"pointer"}}>Enter</button>
            <span style={{fontSize:11,color:"#444"}}>Hint: mono2024</span>
          </div>
        )}
      </header>

      {cartOpen && view !== "checkout" && view !== "success" && (
        <Cart items={cart} onRemove={removeFromCart} onUpdateQty={updateQty} onCheckout={()=>{setCartOpen(false);setView("checkout");}} onClose={()=>setCartOpen(false)}/>
      )}

      {view === "checkout" && <CheckoutForm cart={cart} onSuccess={(d)=>{setSuccessData(d);setCart([]);setView("success");}} onBack={()=>{setView("shop");setCartOpen(true);}}/>}
      {view === "success" && successData && <OrderSuccess order={successData}/>}

      {view === "shop" && (
        <>
          {/* Hero */}
          <section style={{position:"relative",overflow:"hidden",borderBottom:"1px solid #111"}}>
            <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.04) 0%, transparent 70%)"}}/>
            <div style={{maxWidth:1280,margin:"0 auto",padding:"100px 32px 80px",textAlign:"center"}}>
              <p style={{margin:"0 0 16px",fontSize:11,fontWeight:600,letterSpacing:"0.25em",textTransform:"uppercase",color:"#555"}}>Outdoor & Architectural Lighting</p>
              <h1 style={{margin:"0 0 24px",fontSize:"clamp(48px, 8vw, 96px)",fontWeight:300,lineHeight:1.0,letterSpacing:"-0.02em",fontFamily:"'Cormorant Garamond',Georgia,serif",color:"#fff"}}>Light That<br/><em style={{fontStyle:"italic",color:"#888"}}>Defines Space</em></h1>
              <p style={{margin:"0 0 40px",fontSize:15,color:"#555",maxWidth:500,marginLeft:"auto",marginRight:"auto",lineHeight:1.8}}>Precision-crafted outdoor and architectural lighting for spaces that demand character.</p>
              <button onClick={()=>document.getElementById("products").scrollIntoView({behavior:"smooth"})} style={{padding:"14px 36px",background:"#fff",color:"#000",border:"none",borderRadius:8,fontSize:13,fontWeight:600,letterSpacing:"0.08em",cursor:"pointer"}}>Shop Collection</button>
            </div>
          </section>

          {/* Filters */}
          <div style={{borderBottom:"1px solid #111",position:"sticky",top:64,zIndex:50,background:"rgba(8,8,8,0.97)"}}>
            <div style={{maxWidth:1280,margin:"0 auto",padding:"0 32px",height:56,display:"flex",alignItems:"center",justifyContent:"space-between",gap:16}}>
              <div style={{display:"flex",gap:4,overflowX:"auto"}}>
                {categories.map(c=>(
                  <button key={c} onClick={()=>setFilter(c)} style={{whiteSpace:"nowrap",padding:"6px 16px",background:filter===c?"#fff":"transparent",color:filter===c?"#000":"#666",border:`1px solid ${filter===c?"#fff":"#222"}`,borderRadius:20,fontSize:12,cursor:"pointer",fontWeight:filter===c?600:400,transition:"all 0.15s"}}>{c}</button>
                ))}
              </div>
              <div style={{display:"flex",gap:8,alignItems:"center",flexShrink:0}}>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search…" style={{background:"#111",border:"1px solid #222",borderRadius:8,padding:"6px 14px",color:"#fff",fontSize:13,outline:"none",width:160}}/>
                <select value={sort} onChange={e=>setSort(e.target.value)} style={{background:"#111",border:"1px solid #222",borderRadius:8,padding:"6px 12px",color:"#888",fontSize:12,outline:"none",cursor:"pointer"}}>
                  <option value="default">Sort: Default</option>
                  <option value="price-asc">Price ↑</option>
                  <option value="price-desc">Price ↓</option>
                  <option value="name">Name A–Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products */}
          <main id="products" style={{maxWidth:1280,margin:"0 auto",padding:"48px 32px 80px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28}}>
              <p style={{margin:0,fontSize:13,color:"#555"}}>{filtered.length} product{filtered.length!==1?"s":""}</p>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:24}}>
              {filtered.map(p=>(
                <ProductCard key={p.id} product={p} onAddToCart={addToCart} onEdit={()=>{}} isAdmin={false}/>
              ))}
            </div>
            {filtered.length === 0 && (
              <div style={{textAlign:"center",padding:"80px 0"}}>
                <p style={{fontSize:32,marginBottom:12,opacity:0.3}}>💡</p>
                <p style={{color:"#555",fontSize:15}}>No products found</p>
              </div>
            )}
          </main>

          {/* Footer */}
          <footer style={{borderTop:"1px solid #111",padding:"40px 32px"}}>
            <div style={{maxWidth:1280,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:32}}>
              <div>
                <p style={{margin:"0 0 12px",fontSize:13,fontWeight:600,color:"#fff",letterSpacing:"0.15em",textTransform:"uppercase"}}>MONO LIGHTING</p>
                <p style={{margin:0,fontSize:12,color:"#444",lineHeight:1.8}}>Precision outdoor & architectural lighting for spaces that demand character.</p>
              </div>
              <div>
                <p style={{margin:"0 0 12px",fontSize:11,fontWeight:600,color:"#555",letterSpacing:"0.1em",textTransform:"uppercase"}}>Shipping</p>
                <p style={{margin:0,fontSize:12,color:"#444",lineHeight:1.9}}>Free on orders over $500<br/>Standard 5–7 days · Express 2–3 days<br/>Overnight available</p>
              </div>
              <div>
                <p style={{margin:"0 0 12px",fontSize:11,fontWeight:600,color:"#555",letterSpacing:"0.1em",textTransform:"uppercase"}}>Contact</p>
                <p style={{margin:0,fontSize:12,color:"#444",lineHeight:1.9}}>Orders → {GMAIL_ADDRESS}<br/>Returns within 30 days<br/>2-year product warranty</p>
              </div>
            </div>
            <p style={{textAlign:"center",fontSize:11,color:"#2a2a2a",marginTop:40,marginBottom:0}}>© 2025 MONO LIGHTING. All rights reserved.</p>
          </footer>
        </>
      )}
    </div>
  );
}
