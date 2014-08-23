<h1 id="moment-revolution">moment-revolution</h1>
<p><code>moment-revolution</code> is a <a href="http://momentjs.com">moment</a> plugin to display a date in the <a href="http://en.wikipedia.org/wiki/French_Republican_Calendar">French Republican Calendar</a> format.</p>
<pre><code class="lang-js">moment(<span class="hljs-literal">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-number">1988</span>, <span class="hljs-number">2</span>, <span class="hljs-number">29</span>)<span class="hljs-built_in">.</span>toRevolutionnary(); <span class="hljs-comment">//Nonidi 9 Germinal 196</span></code></pre>
<h2 id="installation">Installation</h2>
<p><code>moment-revolution</code> is designed to work both using <a href="http://nodejs.org">node</a> or in the browser.</p>
<h3 id="in-the-browser">In the browser</h3>
<pre><code class="lang-html"><span class="hljs-tag">&lt;<span class="hljs-title">script</span> <span class="hljs-attribute">src</span>=<span class="hljs-value">"moment.js"</span>&gt;</span><span class="javascript"></span><span class="hljs-tag">&lt;/<span class="hljs-title">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-title">script</span> <span class="hljs-attribute">src</span>=<span class="hljs-value">"moment-revolution.js"</span>&gt;</span><span class="javascript"></span><span class="hljs-tag">&lt;/<span class="hljs-title">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-title">script</span>&gt;</span><span class="javascript">
  ...
</span><span class="hljs-tag">&lt;/<span class="hljs-title">script</span>&gt;</span></code></pre>
<h3 id="with-node">With node</h3>
<p><code>moment-revolution</code>requires moment, but does not include it in its own dependencies, so you have to add it to your <code>package.json</code>file. However, you do not have to require it.</p>
<pre><code class="lang-js">var moment = <span class="hljs-keyword">require</span>(<span class="hljs-string">'moment-revolution'</span>);
<span class="hljs-keyword">...</span></code></pre>
<h2 id="usage">Usage</h2>
<pre><code class="lang-js"><span class="hljs-built_in">var</span> moment <span class="hljs-subst">=</span> <span class="hljs-keyword">require</span>(<span class="hljs-string">'moment-revolution'</span>);

<span class="hljs-built_in">var</span> start <span class="hljs-subst">=</span> moment(<span class="hljs-literal">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-number">1792</span>, <span class="hljs-number">8</span>, <span class="hljs-number">22</span>));
<span class="hljs-built_in">var</span> rev <span class="hljs-subst">=</span> start<span class="hljs-built_in">.</span>toRevolutionnary();
console<span class="hljs-built_in">.</span><span class="hljs-keyword">log</span>(rev); <span class="hljs-comment">// Primidi 1 Vendémiaire 1</span></code></pre>
<h2 id="credit">Credit</h2>
<p>Fourmilab Calendar Converter - <a href="http://fourmilab.ch">fourmilab.ch</a></p>
<h2 id="dedication">Dedication</h2>
<p>This work is dedicated to Maximilien Marie Isidore de Robespierre.</p>
<h2 id="license">License</h2>
<p>This program is in the public domain.</p>
