import streamlit as st
import os, json
from dotenv import load_dotenv

from langchain_community.chat_models import ChatOpenAI
from langchain_community.document_loaders import CSVLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_core.prompts import PromptTemplate

# ✅ Add these two missing imports:
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain

# --- Load environment variables ---
load_dotenv()
openai_key = os.getenv("OPENAI_API_KEY")

# --- Streamlit UI setup ---
st.set_page_config(page_title="🇦🇺 AI-Proof Career Navigator", page_icon="🤖")
st.title("🇦🇺 AI-Proof Career Navigator")
st.caption("Future-proof your career with data-driven AI insights from Australian job & skills datasets.")

# --- Vectorstore loading and embedding ---
@st.cache_resource
def load_vectorstore():
    """Load and embed all Australian datasets once."""
    docs = []
    data_dir = os.path.join("server", "data")  # ✅ Correct path
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)

    # ✅ Check API key validity before embedding
    if not openai_key or not openai_key.startswith("sk-"):
        st.error("❌ OpenAI API key missing or invalid. Check your .env file.")
        st.stop()

    # ✅ Use correct embedding model for GPT-4o projects
    embeddings = OpenAIEmbeddings(
        model="text-embedding-3-small",  # or "text-embedding-3-large" if you want more accuracy
        openai_api_key=openai_key
    )

    print("✅ Using OpenAI key starts with:", openai_key[:10], "...")

    # --- TXT files ---
    txt_files = [
        "australian_career_transitions.txt",
        "australian_job_market_insights.txt"
    ]
    for fname in txt_files:
        path = os.path.join(data_dir, fname)
        if os.path.exists(path):
            loader = TextLoader(path, encoding="utf-8")
            raw_docs = loader.load()
            docs += splitter.split_documents(raw_docs)
        else:
            st.warning(f"⚠️ Missing file: {fname}")

    # --- CSV files ---
    csv_files = [
        "australian_ai_courses.csv",
        "australian_salary_data.csv"
    ]
    for fname in csv_files:
        path = os.path.join(data_dir, fname)
        if os.path.exists(path):
            loader = CSVLoader(path)
            raw_docs = loader.load()
            docs += splitter.split_documents(raw_docs)
        else:
            st.warning(f"⚠️ Missing file: {fname}")

    # --- JSON taxonomy ---
    json_path = os.path.join(data_dir, "australian_ai_skills_taxonomy.json")
    if os.path.exists(json_path):
        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            docs.append({"page_content": json.dumps(data)})

    # --- Filter out empty content ---
    docs = [d for d in docs if getattr(d, "page_content", "").strip()]
    if not docs:
        st.error("❌ No valid documents found in data directory.")
        raise ValueError("No valid documents found for embedding.")

    st.write(f"✅ Loaded {len(docs)} valid text chunks for embedding...")

    # --- Build FAISS vectorstore ---
    return FAISS.from_documents(docs, embeddings)

# --- Build retriever ---
vectorstore = load_vectorstore()
retriever = vectorstore.as_retriever(search_kwargs={"k": 5})

# --- Prompt template ---
template = """
You are an empathetic Australian career advisor helping users stay future-proof in the AI era.
Use only Australian data from the context below.
Be concise, clear, and encouraging.

Question: {input}
Context: {context}
"""
prompt = PromptTemplate(input_variables=["context", "input"], template=template)

# --- LLM + Chain setup ---
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.4, openai_api_key=openai_key)
combine_docs_chain = create_stuff_documents_chain(llm, prompt)
qa_chain = create_retrieval_chain(retriever, combine_docs_chain)

# --- Streamlit UI interaction ---
question = st.text_area("💬 Ask your career question:", placeholder="e.g. What AI-resilient careers are growing fastest in Australia?")

if st.button("Ask") and question:
    with st.spinner("Thinking..."):
        try:
            result = qa_chain.invoke({"input": question})
            st.markdown(f"### 🧠 Answer\n{result['answer']}")
        except Exception as e:
            st.error(f"⚠️ An error occurred: {e}")
