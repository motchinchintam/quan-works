// ─── TSX (TypeScript + React) Course Content: Beginner → Master ───────────
// IDs start at 9000+ to avoid collisions with user-created content.
// The Learning Hub checks for id 9001 before importing to prevent duplicates.

export interface Card { id: number; front: string; back: string; status: 'new' | 'know' | 'review'; }
export interface Deck { id: number; name: string; cards: Card[]; createdAt: string; }
export interface Option { id: number; text: string; }
export interface Question { id: number; text: string; options: Option[]; correctId: number; explanation: string; }
export interface Quiz { id: number; name: string; questions: Question[]; createdAt: string; }
export interface Note { id: number; title: string; content: string; category: string; tags: string; pinned: boolean; createdAt: string; updatedAt: string; }
export interface Goal { id: number; title: string; category: string; description: string; target: number; current: number; unit: string; deadline: string; done: boolean; createdAt: string; }

const NOW = new Date().toISOString();

// ── FLASHCARD DECKS ────────────────────────────────────────────────────────
export const TSX_DECKS: Deck[] = [
  {
    id: 9001, name: '🟢 TSX Beginner — JSX & Components', createdAt: NOW,
    cards: [
      { id: 90011, front: 'What is TSX?', back: 'TSX = TypeScript + JSX. It lets you write HTML-like syntax inside TypeScript files (.tsx) to describe React UI.', status: 'new' },
      { id: 90012, front: 'What is a React component?', back: 'A function that returns JSX. It is the building block of React UIs.\n\nfunction Hello() {\n  return <h1>Hello!</h1>;\n}', status: 'new' },
      { id: 90013, front: 'What is JSX?', back: 'A syntax extension that looks like HTML but compiles to React.createElement() calls.\n\n<div className="box"> → React.createElement("div", { className: "box" })', status: 'new' },
      { id: 90014, front: 'What is the difference between className and class in JSX?', back: 'Use className instead of class in JSX because "class" is a reserved word in JavaScript/TypeScript.', status: 'new' },
      { id: 90015, front: 'How do you embed a JavaScript expression in JSX?', back: 'Wrap it in curly braces { }.\n\nconst name = "Quân";\nreturn <h1>Hello, {name}!</h1>;', status: 'new' },
      { id: 90016, front: 'What are props?', back: 'Props (properties) are inputs passed from a parent component to a child component. They are read-only inside the child.\n\n<Button label="Click me" />', status: 'new' },
      { id: 90017, front: 'How do you type props in TypeScript?', back: 'Define an interface and use it as the function parameter type.\n\ninterface Props { label: string; count?: number; }\nfunction Button({ label, count }: Props) { ... }', status: 'new' },
      { id: 90018, front: 'What is conditional rendering?', back: 'Rendering JSX based on a condition.\n\n{isLoggedIn ? <Dashboard /> : <Login />}\n// or\n{hasError && <ErrorMessage />}', status: 'new' },
      { id: 90019, front: 'How do you render a list in React?', back: 'Use .map() and always provide a unique "key" prop.\n\n{items.map(item => (\n  <li key={item.id}>{item.name}</li>\n))}', status: 'new' },
      { id: 90020, front: 'Why must JSX return a single root element?', back: 'React components must return one root. Wrap siblings in a <div> or empty fragment <> </> if needed.\n\nreturn <><Header /><Main /></>;', status: 'new' },
      { id: 90021, front: 'What is a fragment in React?', back: 'A wrapper that groups elements without adding an extra DOM node.\n\n<React.Fragment> or shorthand <> </>',  status: 'new' },
      { id: 90022, front: 'How do you handle a click event in TSX?', back: 'Pass a function to the onClick prop.\n\n<button onClick={() => alert("clicked!")}>Click</button>\n\nWith TypeScript: (e: React.MouseEvent<HTMLButtonElement>) => void', status: 'new' },
    ],
  },
  {
    id: 9002, name: '🟡 TSX Intermediate — Hooks & State', createdAt: NOW,
    cards: [
      { id: 90031, front: 'What is useState?', back: 'A hook that adds local state to a functional component.\n\nconst [count, setCount] = useState(0);\n\nFirst value: current state. Second: updater function.', status: 'new' },
      { id: 90032, front: 'How do you type useState with TypeScript?', back: 'Pass the type as a generic:\n\nconst [name, setName] = useState<string>("");\nconst [user, setUser] = useState<User | null>(null);', status: 'new' },
      { id: 90033, front: 'What is useEffect?', back: 'A hook for side effects — data fetching, subscriptions, DOM manipulation.\n\nuseEffect(() => {\n  // runs after render\n  return () => { /* cleanup */ };\n}, [dependency]);', status: 'new' },
      { id: 90034, front: 'What does the dependency array in useEffect do?', back: '[] — run once on mount only.\n[value] — re-run when "value" changes.\nomitted — run after every render.\n\nAlways list every reactive value you use inside.', status: 'new' },
      { id: 90035, front: 'What is useRef?', back: 'Returns a mutable ref object whose .current property persists across renders without causing re-renders.\n\nUse cases: DOM access, storing previous values, timers.\n\nconst inputRef = useRef<HTMLInputElement>(null);', status: 'new' },
      { id: 90036, front: 'What is useContext?', back: 'Consumes a React context value without prop drilling.\n\nconst theme = useContext(ThemeContext);\n\nPair with createContext() and a Provider to share state across the tree.', status: 'new' },
      { id: 90037, front: 'What is useReducer?', back: 'An alternative to useState for complex state logic.\n\nconst [state, dispatch] = useReducer(reducer, initialState);\n\nReducer: (state, action) => newState', status: 'new' },
      { id: 90038, front: 'What is a custom hook?', back: 'A function starting with "use" that encapsulates reusable stateful logic.\n\nfunction useWindowWidth() {\n  const [width, setWidth] = useState(window.innerWidth);\n  useEffect(() => { ... }, []);\n  return width;\n}', status: 'new' },
      { id: 90039, front: 'What is the children prop?', back: 'A special prop that receives JSX passed between a component\'s opening and closing tags.\n\ninterface Props { children: React.ReactNode; }\nfunction Card({ children }: Props) {\n  return <div className="card">{children}</div>;\n}', status: 'new' },
      { id: 90040, front: 'What is the difference between controlled and uncontrolled inputs?', back: 'Controlled: value is driven by React state (useState). You handle onChange.\n\nUncontrolled: value lives in the DOM; use useRef to read it.\n\nPrefer controlled inputs for forms.', status: 'new' },
      { id: 90041, front: 'How do you type an onChange event for an input in TSX?', back: 'onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}\n\nFor select: React.ChangeEvent<HTMLSelectElement>', status: 'new' },
      { id: 90042, front: 'What is lifting state up?', back: 'Moving shared state to the nearest common ancestor so multiple child components can access and update it via props.', status: 'new' },
    ],
  },
  {
    id: 9003, name: '🔴 TSX Advanced — Performance & Patterns', createdAt: NOW,
    cards: [
      { id: 90051, front: 'What is React.memo?', back: 'A HOC that memoizes a component — skips re-render if props have not changed.\n\nconst MyComponent = React.memo(function MyComponent(props) { ... });', status: 'new' },
      { id: 90052, front: 'What is useMemo?', back: 'Memoizes an expensive computed value, recalculating only when dependencies change.\n\nconst sorted = useMemo(() => items.sort(), [items]);\n\nDo NOT overuse — profiling first.', status: 'new' },
      { id: 90053, front: 'What is useCallback?', back: 'Memoizes a function so its reference stays stable across renders. Useful when passing callbacks to memoized children.\n\nconst handleClick = useCallback(() => { ... }, [dep]);', status: 'new' },
      { id: 90054, front: 'What is code splitting in React?', back: 'Splitting the bundle into smaller chunks loaded on demand.\n\nconst LazyPage = React.lazy(() => import("./Page"));\n\nWrap in <Suspense fallback={<Spinner />}> to handle loading.', status: 'new' },
      { id: 90055, front: 'What is a generic React component?', back: 'A component that accepts a type parameter to stay reusable.\n\nfunction List<T extends { id: number }>({ items, render }: {\n  items: T[];\n  render: (item: T) => React.ReactNode;\n}) { ... }', status: 'new' },
      { id: 90056, front: 'What is the render props pattern?', back: 'Sharing logic by passing a function as a prop that returns JSX.\n\n<DataFetcher url="/api/users" render={data => <UserList data={data} />} />', status: 'new' },
      { id: 90057, front: 'What is a compound component pattern?', back: 'A pattern where a parent and child components share implicit state via context.\n\n<Select>\n  <Select.Option value="a">A</Select.Option>\n  <Select.Option value="b">B</Select.Option>\n</Select>', status: 'new' },
      { id: 90058, front: 'What are discriminated unions in TSX props?', back: 'Using a literal type field to narrow prop types.\n\ntype Props =\n  | { variant: "icon"; icon: string }\n  | { variant: "text"; label: string };\n\nTypeScript narrows correctly inside each branch.', status: 'new' },
      { id: 90059, front: 'What is forwardRef in React?', back: 'Lets a parent pass a ref to a child\'s DOM element.\n\nconst Input = React.forwardRef<HTMLInputElement, Props>(\n  (props, ref) => <input ref={ref} {...props} />\n);', status: 'new' },
      { id: 90060, front: 'What is the useImperativeHandle hook?', back: 'Customises what a parent sees when it uses a ref on a child (used with forwardRef).\n\nuseImperativeHandle(ref, () => ({\n  focus: () => inputRef.current?.focus()\n}));', status: 'new' },
      { id: 90061, front: 'What is a Portal in React?', back: 'Renders children into a different DOM node outside the component tree. Useful for modals/tooltips.\n\nReactDOM.createPortal(<Modal />, document.body)', status: 'new' },
      { id: 90062, front: 'What is an Error Boundary?', back: 'A class component that catches JS errors in its child tree and shows a fallback UI.\n\nImplement componentDidCatch and getDerivedStateFromError.\n\nNote: cannot be a function component.', status: 'new' },
    ],
  },
];

// ── QUIZZES ────────────────────────────────────────────────────────────────
export const TSX_QUIZZES: Quiz[] = [
  {
    id: 9011, name: '🟢 TSX Beginner Quiz', createdAt: NOW,
    questions: [
      { id: 1, text: 'Which file extension is used for TypeScript + JSX files?',
        correctId: 3, explanation: '.tsx is the correct extension for files that contain both TypeScript and JSX syntax.',
        options: [{ id: 1, text: '.ts' }, { id: 2, text: '.jsx' }, { id: 3, text: '.tsx' }, { id: 4, text: '.tx' }] },
      { id: 2, text: 'In JSX, what attribute do you use instead of the HTML "class"?',
        correctId: 2, explanation: '"class" is a reserved JavaScript keyword, so React uses "className" for CSS class assignment.',
        options: [{ id: 1, text: 'class' }, { id: 2, text: 'className' }, { id: 3, text: 'cssClass' }, { id: 4, text: 'classList' }] },
      { id: 3, text: 'How do you embed a variable "name" inside JSX?',
        correctId: 1, explanation: 'Curly braces { } are used to embed any JavaScript expression inside JSX.',
        options: [{ id: 1, text: '{name}' }, { id: 2, text: '{{name}}' }, { id: 3, text: '$(name)' }, { id: 4, text: '%name%' }] },
      { id: 4, text: 'What must every item in a .map() rendered list have?',
        correctId: 4, explanation: 'React needs a unique "key" prop on each list item to efficiently track and update the DOM.',
        options: [{ id: 1, text: 'An id attribute' }, { id: 2, text: 'A className' }, { id: 3, text: 'A ref prop' }, { id: 4, text: 'A key prop' }] },
      { id: 5, text: 'What does a React component MUST return?',
        correctId: 2, explanation: 'A React functional component must return JSX (or null). It cannot return plain strings or numbers at the top level.',
        options: [{ id: 1, text: 'A JavaScript object' }, { id: 2, text: 'JSX or null' }, { id: 3, text: 'A string' }, { id: 4, text: 'An array only' }] },
      { id: 6, text: 'Which is the correct way to handle a button click?',
        correctId: 3, explanation: 'onClick accepts a function. Using onClick={handleClick} passes the function reference correctly without calling it immediately.',
        options: [{ id: 1, text: '<button onclick={handleClick}>' }, { id: 2, text: '<button onClick={handleClick()}>' }, { id: 3, text: '<button onClick={handleClick}>' }, { id: 4, text: '<button on-click={handleClick}>' }] },
    ],
  },
  {
    id: 9012, name: '🟡 TSX Intermediate Quiz', createdAt: NOW,
    questions: [
      { id: 1, text: 'What is the return value of useState(0)?',
        correctId: 2, explanation: 'useState returns a tuple: [currentValue, setterFunction]. Destructure to use both.',
        options: [{ id: 1, text: 'Just the current value' }, { id: 2, text: '[value, setValue] — a tuple' }, { id: 3, text: 'An object { value, setValue }' }, { id: 4, text: 'A ref object' }] },
      { id: 2, text: 'When does useEffect with an empty [] dependency array run?',
        correctId: 1, explanation: 'An empty array [] means the effect runs once after the initial render only — like componentDidMount.',
        options: [{ id: 1, text: 'Once after the initial render' }, { id: 2, text: 'After every render' }, { id: 3, text: 'Never' }, { id: 4, text: 'Before the first render' }] },
      { id: 3, text: 'What is the correct type for an input onChange event in TSX?',
        correctId: 4, explanation: 'React.ChangeEvent<HTMLInputElement> is the specific TypeScript type for input element change events.',
        options: [{ id: 1, text: 'Event' }, { id: 2, text: 'InputEvent' }, { id: 3, text: 'React.SyntheticEvent' }, { id: 4, text: 'React.ChangeEvent<HTMLInputElement>' }] },
      { id: 4, text: 'What naming convention must custom hooks follow?',
        correctId: 2, explanation: 'React enforces that custom hooks start with "use" so it can enforce the rules of hooks for them.',
        options: [{ id: 1, text: 'Start with "hook"' }, { id: 2, text: 'Start with "use"' }, { id: 3, text: 'Start with "with"' }, { id: 4, text: 'No specific convention' }] },
      { id: 5, text: 'Which hook should you use to access a DOM element directly?',
        correctId: 3, explanation: 'useRef creates a ref object whose .current property points to a DOM element after it mounts.',
        options: [{ id: 1, text: 'useState' }, { id: 2, text: 'useEffect' }, { id: 3, text: 'useRef' }, { id: 4, text: 'useContext' }] },
      { id: 6, text: 'What is "prop drilling"?',
        correctId: 1, explanation: 'Prop drilling is passing props through many intermediate components that don\'t use them, just to reach a deeply nested child. Context or state managers solve this.',
        options: [{ id: 1, text: 'Passing props through many components that don\'t use them' }, { id: 2, text: 'Validating props with TypeScript' }, { id: 3, text: 'Destructuring props in a component' }, { id: 4, text: 'Spreading props with {...props}' }] },
    ],
  },
  {
    id: 9013, name: '🔴 TSX Advanced Quiz', createdAt: NOW,
    questions: [
      { id: 1, text: 'What does React.memo do?',
        correctId: 2, explanation: 'React.memo is a HOC that prevents a component from re-rendering if its props have not changed (shallow comparison).',
        options: [{ id: 1, text: 'Memoizes a computed value' }, { id: 2, text: 'Prevents re-render when props are unchanged' }, { id: 3, text: 'Memoizes a callback function' }, { id: 4, text: 'Creates a context' }] },
      { id: 2, text: 'What is the difference between useMemo and useCallback?',
        correctId: 3, explanation: 'useMemo memoizes the RESULT of a function (a value). useCallback memoizes the FUNCTION ITSELF (its reference).',
        options: [{ id: 1, text: 'They are identical' }, { id: 2, text: 'useMemo is for functions, useCallback is for values' }, { id: 3, text: 'useMemo memoizes a value, useCallback memoizes a function reference' }, { id: 4, text: 'useCallback only works in class components' }] },
      { id: 3, text: 'What is needed to use React.lazy()?',
        correctId: 4, explanation: 'React.lazy() loads a component dynamically. It requires a <Suspense> boundary with a fallback prop to show while loading.',
        options: [{ id: 1, text: 'A Redux store' }, { id: 2, text: 'useEffect with an empty array' }, { id: 3, text: 'A custom hook' }, { id: 4, text: 'A <Suspense> wrapper with a fallback' }] },
      { id: 4, text: 'What TypeScript feature helps narrow props for components with multiple variants?',
        correctId: 1, explanation: 'Discriminated unions use a shared literal-type field (like "variant") to let TypeScript narrow the type correctly in each branch.',
        options: [{ id: 1, text: 'Discriminated union types' }, { id: 2, text: 'Partial<T>' }, { id: 3, text: 'Enums' }, { id: 4, text: 'Type assertions with "as"' }] },
      { id: 5, text: 'Which hook is used with forwardRef to control what a parent can do with a ref?',
        correctId: 3, explanation: 'useImperativeHandle lets you customise the exposed ref handle so parents only see what you explicitly allow.',
        options: [{ id: 1, text: 'useRef' }, { id: 2, text: 'useEffect' }, { id: 3, text: 'useImperativeHandle' }, { id: 4, text: 'useCallback' }] },
      { id: 6, text: 'What is a React Portal used for?',
        correctId: 2, explanation: 'Portals render children into a DOM node outside the parent component\'s DOM hierarchy — ideal for modals, tooltips, dropdowns.',
        options: [{ id: 1, text: 'Lazy loading a component' }, { id: 2, text: 'Rendering into a DOM node outside the component tree' }, { id: 3, text: 'Sharing state between components' }, { id: 4, text: 'Creating a context provider' }] },
    ],
  },
];

// ── STUDY NOTES ────────────────────────────────────────────────────────────
export const TSX_NOTES: Note[] = [
  {
    id: 9021, title: '🟢 TSX 101 — What is TSX & How React Works', category: 'TypeScript',
    tags: 'tsx, beginner, jsx, virtual dom',
    pinned: true, createdAt: NOW, updatedAt: NOW,
    content: `TSX = TypeScript + JSX (JavaScript XML)
File extension: .tsx

──────────────────────────────────────
HOW REACT WORKS
──────────────────────────────────────
1. You write components (functions returning JSX)
2. React builds a Virtual DOM (a JS object tree)
3. React compares old vs new Virtual DOM (diffing)
4. Only the changed parts update in the real DOM (reconciliation)

This makes React fast — it avoids full page reloads.

──────────────────────────────────────
YOUR FIRST COMPONENT
──────────────────────────────────────
// Greeting.tsx
function Greeting({ name }: { name: string }) {
  return <h1>Hello, {name}!</h1>;
}

export default Greeting;

// Usage in App.tsx
<Greeting name="Quân" />

──────────────────────────────────────
JSX RULES
──────────────────────────────────────
1. Return one root element (use <> </> fragment if needed)
2. All tags must be closed: <img /> not <img>
3. Use className not class
4. Use htmlFor not for (on labels)
5. Expressions go in { } curly braces
6. camelCase event names: onClick, onChange, onSubmit

──────────────────────────────────────
CONDITIONAL RENDERING
──────────────────────────────────────
// Ternary — show one OR the other
{isLoggedIn ? <Dashboard /> : <Login />}

// Short-circuit — show or nothing
{hasError && <ErrorBanner />}

// Multiple conditions
function Status({ code }: { code: number }) {
  if (code === 200) return <span>OK</span>;
  if (code === 404) return <span>Not Found</span>;
  return <span>Error</span>;
}

──────────────────────────────────────
RENDERING LISTS
──────────────────────────────────────
const users = [{ id: 1, name: "An" }, { id: 2, name: "Bình" }];

{users.map(user => (
  <li key={user.id}>{user.name}</li>
))}

⚠️ key must be unique and stable. Use IDs, not array index.`,
  },
  {
    id: 9022, title: '🟢 TSX 102 — Props & TypeScript Types', category: 'TypeScript',
    tags: 'tsx, props, interface, types, beginner',
    pinned: false, createdAt: NOW, updatedAt: NOW,
    content: `──────────────────────────────────────
TYPING PROPS WITH INTERFACE
──────────────────────────────────────
interface ButtonProps {
  label: string;           // required
  onClick: () => void;     // required function
  disabled?: boolean;      // optional (may be undefined)
  variant?: 'primary' | 'secondary'; // optional union
}

function Button({ label, onClick, disabled = false, variant = 'primary' }: ButtonProps) {
  return (
    <button
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

──────────────────────────────────────
COMMON PROP TYPES
──────────────────────────────────────
string         → title: string
number         → count: number
boolean        → isActive: boolean
function       → onClick: () => void
function w/arg → onChange: (value: string) => void
JSX children   → children: React.ReactNode
array          → items: string[]
object         → user: { id: number; name: string }
union          → status: 'active' | 'inactive'
optional any   → data?: unknown

──────────────────────────────────────
SPREADING PROPS
──────────────────────────────────────
// Forward all HTML div attributes to a wrapper
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

function Card({ title, ...rest }: CardProps) {
  return <div {...rest}><h2>{title}</h2></div>;
}

──────────────────────────────────────
CHILDREN PROP
──────────────────────────────────────
interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <nav>Nav</nav>
      <main>{children}</main>
    </div>
  );
}

// Usage
<Layout>
  <MyPage />
</Layout>

──────────────────────────────────────
DEFAULT PROPS
──────────────────────────────────────
// Use default parameter values
function Avatar({ size = 40, src }: { size?: number; src: string }) {
  return <img width={size} height={size} src={src} />;
}`,
  },
  {
    id: 9023, title: '🟡 TSX 103 — useState & useEffect', category: 'TypeScript',
    tags: 'tsx, hooks, useState, useEffect, intermediate',
    pinned: false, createdAt: NOW, updatedAt: NOW,
    content: `──────────────────────────────────────
useState
──────────────────────────────────────
const [count, setCount] = useState(0);
const [name, setName] = useState<string>("");
const [user, setUser] = useState<User | null>(null);
const [items, setItems] = useState<string[]>([]);

// Update rules:
setCount(count + 1);              // OK for simple values
setCount(prev => prev + 1);       // PREFERRED — safe updater form
setUser({ ...user, name: "Quân" }); // objects: always spread, never mutate

──────────────────────────────────────
COMMON MISTAKE: mutating state
──────────────────────────────────────
// ❌ WRONG — mutates state directly
const list = items;
list.push("new item");
setItems(list); // React may not re-render

// ✅ CORRECT — create new array
setItems([...items, "new item"]);
setItems(prev => prev.filter(x => x !== "old"));

──────────────────────────────────────
useEffect
──────────────────────────────────────
// Run on mount only
useEffect(() => {
  fetchData();
}, []);

// Run when "id" changes
useEffect(() => {
  fetchUser(id);
}, [id]);

// Run on every render (rarely needed)
useEffect(() => {
  document.title = name;
});

// Cleanup (subscriptions, timers)
useEffect(() => {
  const timer = setInterval(tick, 1000);
  return () => clearInterval(timer); // cleanup
}, []);

──────────────────────────────────────
ASYNC IN useEffect
──────────────────────────────────────
// useEffect callback cannot be async directly
useEffect(() => {
  async function load() {
    const data = await fetchData();
    setItems(data);
  }
  load();
}, []);

──────────────────────────────────────
FULL EXAMPLE: data fetching with loading
──────────────────────────────────────
function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/users")
      .then(r => r.json())
      .then(data => { setUsers(data); setLoading(false); })
      .catch(() => { setError("Failed to load"); setLoading(false); });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}`,
  },
  {
    id: 9024, title: '🟡 TSX 104 — useRef, useMemo, useCallback', category: 'TypeScript',
    tags: 'tsx, hooks, useRef, useMemo, useCallback, intermediate',
    pinned: false, createdAt: NOW, updatedAt: NOW,
    content: `──────────────────────────────────────
useRef
──────────────────────────────────────
Two main uses:

1. DOM access
const inputRef = useRef<HTMLInputElement>(null);
<input ref={inputRef} />
// Later:
inputRef.current?.focus();

2. Storing mutable values (no re-render)
const countRef = useRef(0);
countRef.current += 1; // does NOT cause re-render

Tip: use useRef (not useState) for values like timers,
     previous values, or flags that should not trigger renders.

──────────────────────────────────────
useMemo — memoize a computed VALUE
──────────────────────────────────────
const filtered = useMemo(() => {
  return items.filter(x => x.active);
}, [items]); // only re-compute when "items" changes

When to use:
✅ Expensive calculation (sorting large arrays, complex math)
❌ Don't use for simple values — useMemo itself has overhead

──────────────────────────────────────
useCallback — memoize a FUNCTION
──────────────────────────────────────
const handleSubmit = useCallback((e: React.FormEvent) => {
  e.preventDefault();
  submitForm(data);
}, [data]); // new function only when "data" changes

When to use:
✅ Passing callbacks to React.memo() children
✅ Using a function inside useEffect dependencies
❌ Don't wrap every function — only when referential stability matters

──────────────────────────────────────
useMemo vs useCallback
──────────────────────────────────────
useMemo(fn, deps)     → memoises fn() RESULT (a value)
useCallback(fn, deps) → memoises fn ITSELF (a function)

// These are equivalent:
useCallback(fn, deps)
useMemo(() => fn, deps)

──────────────────────────────────────
GOLDEN RULE
──────────────────────────────────────
Don't optimise prematurely.
1. Write clear code first
2. Profile with React DevTools
3. Only add memo/useMemo/useCallback where there is a measured problem`,
  },
  {
    id: 9025, title: '🟡 TSX 105 — Context API & Custom Hooks', category: 'TypeScript',
    tags: 'tsx, context, custom hooks, useContext, intermediate',
    pinned: false, createdAt: NOW, updatedAt: NOW,
    content: `──────────────────────────────────────
CONTEXT API — avoid prop drilling
──────────────────────────────────────
Step 1: Create context
interface ThemeCtx { dark: boolean; toggle: () => void; }
const ThemeContext = createContext<ThemeCtx>({
  dark: false, toggle: () => {},
});

Step 2: Create provider
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);
  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark(d => !d) }}>
      {children}
    </ThemeContext.Provider>
  );
}

Step 3: Consume in any child
function Header() {
  const { dark, toggle } = useContext(ThemeContext);
  return <button onClick={toggle}>{dark ? "☀️ Light" : "🌙 Dark"}</button>;
}

Step 4: Wrap your app
<ThemeProvider>
  <App />
</ThemeProvider>

──────────────────────────────────────
CUSTOM HOOKS
──────────────────────────────────────
Rules:
1. Name starts with "use"
2. Can call other hooks inside
3. Returns whatever the component needs

-- useLocalStorage --
function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try { return JSON.parse(localStorage.getItem(key) || ""); }
    catch { return initial; }
  });
  function set(val: T) {
    setValue(val);
    localStorage.setItem(key, JSON.stringify(val));
  }
  return [value, set] as const;
}

-- useDebounce --
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

-- useFetch --
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(url).then(r => r.json()).then(d => { setData(d); setLoading(false); });
  }, [url]);
  return { data, loading };
}`,
  },
  {
    id: 9026, title: '🔴 TSX 106 — Advanced Patterns', category: 'TypeScript',
    tags: 'tsx, advanced, patterns, compound, render props, hoc',
    pinned: false, createdAt: NOW, updatedAt: NOW,
    content: `──────────────────────────────────────
RENDER PROPS
──────────────────────────────────────
Share logic by passing a function that returns JSX.

interface MouseProps { render: (x: number, y: number) => React.ReactNode; }

function MouseTracker({ render }: MouseProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <div onMouseMove={e => setPos({ x: e.clientX, y: e.clientY })}>
      {render(pos.x, pos.y)}
    </div>
  );
}

<MouseTracker render={(x, y) => <p>X:{x} Y:{y}</p>} />

──────────────────────────────────────
COMPOUND COMPONENTS
──────────────────────────────────────
Parent and children share state via context.

const TabsContext = createContext<{ active: string; set: (v: string) => void }>(...);

function Tabs({ children }: { children: React.ReactNode }) {
  const [active, set] = useState("");
  return <TabsContext.Provider value={{ active, set }}>{children}</TabsContext.Provider>;
}
Tabs.Tab = function Tab({ value, label }: { value: string; label: string }) {
  const { active, set } = useContext(TabsContext);
  return <button className={active === value ? "active" : ""} onClick={() => set(value)}>{label}</button>;
};

<Tabs>
  <Tabs.Tab value="sql" label="SQL" />
  <Tabs.Tab value="tsx" label="TSX" />
</Tabs>

──────────────────────────────────────
HIGHER-ORDER COMPONENTS (HOC)
──────────────────────────────────────
A function that takes a component and returns an enhanced one.

function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthGuard(props: P) {
    const { isAuth } = useAuth();
    if (!isAuth) return <Navigate to="/login" />;
    return <Component {...props} />;
  };
}

const ProtectedDashboard = withAuth(Dashboard);

──────────────────────────────────────
FORWARDREF
──────────────────────────────────────
const TextInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => <input ref={ref} className="input" {...props} />
);

// Parent can now focus it:
const ref = useRef<HTMLInputElement>(null);
<TextInput ref={ref} />
ref.current?.focus();

──────────────────────────────────────
DISCRIMINATED UNIONS FOR PROPS
──────────────────────────────────────
type ButtonProps =
  | { variant: "icon"; icon: string; label?: never }
  | { variant: "text"; label: string; icon?: never };

function Button(props: ButtonProps) {
  if (props.variant === "icon") return <span>{props.icon}</span>;
  return <button>{props.label}</button>;
}`,
  },
  {
    id: 9027, title: '🔴 TSX 107 — Performance Optimisation', category: 'TypeScript',
    tags: 'tsx, performance, memo, profiler, advanced',
    pinned: false, createdAt: NOW, updatedAt: NOW,
    content: `──────────────────────────────────────
WHY COMPONENTS RE-RENDER
──────────────────────────────────────
A component re-renders when:
1. Its own state changes (useState / useReducer)
2. A context it consumes changes
3. Its parent re-renders (unless memoised)

──────────────────────────────────────
REACT.MEMO — skip child re-render
──────────────────────────────────────
const ExpensiveList = React.memo(function ExpensiveList({ items }: Props) {
  return <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>;
});

// Only re-renders when "items" prop actually changes (shallow compare)
// For deep equality: React.memo(Component, (prev, next) => deepEqual(prev, next))

──────────────────────────────────────
USEMEMO — skip expensive computation
──────────────────────────────────────
function SearchResults({ query, data }: Props) {
  const results = useMemo(() =>
    data.filter(x => x.name.toLowerCase().includes(query.toLowerCase())),
  [data, query]);

  return <List items={results} />;
}

──────────────────────────────────────
USECALLBACK — stable function references
──────────────────────────────────────
function Parent() {
  const [count, setCount] = useState(0);

  // Without useCallback: new function every render → Child always re-renders
  const handleClick = useCallback(() => {
    console.log("clicked");
  }, []); // stable reference

  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <MemoizedChild onClick={handleClick} />
    </>
  );
}

──────────────────────────────────────
CODE SPLITTING — reduce initial bundle
──────────────────────────────────────
import React, { lazy, Suspense } from "react";

const HeavyChart = lazy(() => import("./HeavyChart"));

function Dashboard() {
  return (
    <Suspense fallback={<Spinner />}>
      <HeavyChart />
    </Suspense>
  );
}

──────────────────────────────────────
PROFILING TOOLS
──────────────────────────────────────
1. React DevTools → Profiler tab
   - Record renders, see which components take longest
2. <React.Profiler id="list" onRender={callback}>
3. Chrome DevTools → Performance tab

──────────────────────────────────────
CHECKLIST BEFORE OPTIMISING
──────────────────────────────────────
□ Is there actually a performance problem? (measure first)
□ Are keys in lists stable and unique?
□ Are large lists virtualised? (use react-window / react-virtual)
□ Are heavy operations inside useMemo?
□ Are callbacks that go to memo children wrapped in useCallback?`,
  },
  {
    id: 9028, title: '⚫ TSX 108 — Master Level: Advanced Types & Patterns', category: 'TypeScript',
    tags: 'tsx, master, generics, advanced types, patterns',
    pinned: false, createdAt: NOW, updatedAt: NOW,
    content: `──────────────────────────────────────
GENERIC COMPONENTS
──────────────────────────────────────
function Select<T extends { id: number; label: string }>({
  options,
  value,
  onChange,
}: {
  options: T[];
  value: T | null;
  onChange: (val: T) => void;
}) {
  return (
    <select onChange={e => onChange(options.find(o => o.id === +e.target.value)!)}>
      {options.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
    </select>
  );
}

// TypeScript infers T automatically from options
<Select options={users} value={selected} onChange={setSelected} />

──────────────────────────────────────
MAPPED & CONDITIONAL TYPES IN PROPS
──────────────────────────────────────
// Make all event handlers optional
type OptionalHandlers<T> = {
  [K in keyof T as K extends \`on\${string}\` ? K : never]?: T[K];
};

// Conditional type
type IsString<T> = T extends string ? "yes" : "no";

──────────────────────────────────────
USEIMPERATIVEHANDLE
──────────────────────────────────────
interface InputHandle { focus: () => void; clear: () => void; }

const SmartInput = React.forwardRef<InputHandle, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      clear: () => { if (inputRef.current) inputRef.current.value = ""; },
    }));
    return <input ref={inputRef} {...props} />;
  }
);

// Parent
const inputRef = useRef<InputHandle>(null);
inputRef.current?.focus();

──────────────────────────────────────
PORTALS — modals outside the tree
──────────────────────────────────────
import { createPortal } from "react-dom";

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
}

──────────────────────────────────────
ERROR BOUNDARIES
──────────────────────────────────────
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error, info: React.ErrorInfo) { console.error(error, info); }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

<ErrorBoundary fallback={<p>Something went wrong.</p>}>
  <RiskyComponent />
</ErrorBoundary>

──────────────────────────────────────
ZUSTAND — lightweight global state
──────────────────────────────────────
import { create } from "zustand";

interface Store { count: number; inc: () => void; }
const useStore = create<Store>(set => ({
  count: 0,
  inc: () => set(s => ({ count: s.count + 1 })),
}));

function Counter() {
  const { count, inc } = useStore();
  return <button onClick={inc}>{count}</button>;
}

──────────────────────────────────────
LEARNING ROADMAP SUMMARY
──────────────────────────────────────
🟢 Beginner   → JSX, components, props, lists, events
🟡 Intermediate → useState, useEffect, useRef, forms, context, custom hooks
🔴 Advanced   → memo, performance, patterns, forwardRef, portals
⚫ Master     → generics, advanced types, Error Boundaries, state managers`,
  },
];

// ── GOALS ─────────────────────────────────────────────────────────────────
export const TSX_GOALS: Goal[] = [
  { id: 9031, title: 'Complete TSX Beginner Track', category: 'TypeScript', description: 'Learn JSX, components, props, lists, conditional rendering, events', target: 8, current: 0, unit: 'topics', deadline: '2026-05-31', done: false, createdAt: NOW },
  { id: 9032, title: 'Complete TSX Intermediate Track', category: 'TypeScript', description: 'Master hooks: useState, useEffect, useRef, useContext, custom hooks', target: 8, current: 0, unit: 'topics', deadline: '2026-06-30', done: false, createdAt: NOW },
  { id: 9033, title: 'Complete TSX Advanced Track', category: 'TypeScript', description: 'Learn performance optimisation, advanced patterns, forwardRef, portals', target: 6, current: 0, unit: 'topics', deadline: '2026-07-31', done: false, createdAt: NOW },
  { id: 9034, title: 'Build a full TSX project from scratch', category: 'TypeScript', description: 'Apply everything: typed components, hooks, context, custom hooks, optimisation', target: 1, current: 0, unit: 'project', deadline: '2026-08-31', done: false, createdAt: NOW },
];
