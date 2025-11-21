import streamlit as st
import time
import re
import requests
import pandas as pd
import streamlit.components.v1 as components
st.set_page_config(page_title="Health Check Bot")
st.title("Health Check Bot")
st.write("Welcome to the Health Check Bot!")

def extract_environment_and_app(user_input):
    text = user_input.lower()
    env_patterns = {
        'dev': ['dev', 'development'],
        'uat': ['uat', 'qa', 'test'],
        'prod': ['prod', 'production']
    }
    environment = None
    application = None
    for env_key, env_values in env_patterns.items():
        for env_val in env_values:
            if env_val in text:
                environment = env_key
                break
        if environment:
            break
    app_match = re.search(r'on\s+(\w+)\s+application', text)
    if app_match:
        application = app_match.group(1)
    else:
        app_match = re.search(r'(?:for|in)\s+(\w+)', text)
        if app_match:
            application = app_match.group(1)
    return environment, application

user_input = st.chat_input("Hi! How Can I Help you...")

if user_input:
    if user_input.lower() in ["hi", "hello", "hey"]:
        st.chat_message("assistant").write("Hello! How can I assist you with health checks today?")

    elif "health check" in user_input.lower() or "check health" in user_input.lower():
        environment, application = extract_environment_and_app(user_input)
        if environment and application:
            st.chat_message("assistant").write(f"Running Dependency validation for {application.title()} application on {environment.upper()} environment...")
            phases = ["DB Connection", "API Response", "Metrics"]
            phase_containers = []
            for phase in phases:
                container = st.container()
                with container:
                    col1, col2 = st.columns([2, 1])
                    with col1:
                        st.write(f"**{phase}**")
                    with col2:
                        status_placeholder = st.empty()
                    progress_placeholder = st.empty()
                phase_containers.append((progress_placeholder, status_placeholder))
            api_endpoints = {
                "DB Connection": "http://localhost:8000/test/db",
                "API Response": "http://localhost:8000/test/apis", 
                "Metrics": "http://localhost:8000/test/metrics",
                # "Secrets Check": "http://localhost:8000/test/secrets"
            }
            results = {}
            for phase, (progress_placeholder, status_placeholder) in zip(phases, phase_containers):
                endpoint = api_endpoints[phase]
                with progress_placeholder:
                    progress_bar = st.progress(0)
                    for j in range(101):
                        progress_bar.progress(j / 100)
                        time.sleep(0.01)
                try:
                    response = requests.get(endpoint, timeout=5)
                    if response.status_code == 200:
                        data = response.json()
                        st.code(data)
                        # st.code(response.json())
                        with status_placeholder:
                            st.write("✅")
                            if phase == "DB Connection":
                                # st.write(f"Message: {data.get('message', 'No message field in response')}")
                                db = data.get("data", {})
                                details = db.get("details", {})
                                st.write(f"Status: {data.get('status', 'N/A')}")
                                # st.write(f"Latency: {db.get('latency_ms', 'N/A'):.2f} ms")
                                # st.write(f"Connection: {details.get('message', 'N/A')}")
                                # st.write(f"Query: {db.get('status', 'N/A')}")
                                # st.write(f"Result: {details.get('query_result_summary', 'N/A')}")
                                # results[phase] = {
                                #     "Status": db.get('status', 'N/A'),
                                #     "Latency (ms)": db.get('latency_ms', 'N/A'),
                                #     "Details": f"Conn: {details.get('connection_status', 'N/A')}, Query: {details.get('query_status', 'N/A')}"
                                # }
                            elif phase == "API Response":
                                api = data.get("data", {})
                                details = api.get("details", {})
                                st.write(f"APIs Tested: {details.get('apis_tested', 'N/A')}; \n APIs Passed: {details.get('apis_passed', 'N/A')}; \n APIs Failed : {details.get('apis_failed', 'N/A')}")
                                # st.write(f"Status: {api.get('status', 'N/A')}")
                                # st.write(f"Latency: {api.get('latency_ms', 'N/A'):.2f} ms")
                                # st.write(f"APIs Passed: {details.get('apis_passed', 'N/A')}/{details.get('apis_tested', 'N/A')}")
                                # for r in details.get('api_results', []):
                                #     st.write(f"{r.get('name', 'N/A')}: {r.get('status', 'N/A')} ({r.get('latency_ms', 'N/A'):.2f} ms)")
                                # results[phase] = {
                                #     "Status": api.get('status', 'N/A'),
                                #     "Latency (ms)": api.get('latency_ms', 'N/A'),
                                #     "Details": f"Passed: {details.get('apis_passed', 'N/A')}/{details.get('apis_tested', 'N/A')}"
                                # }
                            elif phase == "Metrics":
                                metrics = data.get("data", {})
                                st.write(f"Status: {metrics.get('status')}")
                                st.write(f"Latency: {metrics.get('latency_ms', 'N/A'):.2f} ms")
                                # results[phase] = {
                                #     "Status": metrics.get('status'),
                                #     "Latency (ms)": metrics.get('latency_ms', 'N/A'),
                                #     "Details": "-"
                                # }
                           
                    else:
                        with status_placeholder:
                            st.write("❌")
                            # results[phase] = {
                            #     "Status": "ERROR",
                            #     "Latency (ms)": "-",
                            #     "Details": "API error"
                            # }
                except Exception as e:
                    with status_placeholder:
                        st.write("❌")
                        # results[phase] = {
                        #     "Status": "ERROR",
                        #     "Latency (ms)": "-",
                        #     "Details": str(e)
                        # }
            st.chat_message("assistant").write(f"✅ Validation Completed for {application.title()} on {environment.upper()}!")
        # else:
        #     st.error("Failed to start Validating the application")
        elif environment:
            st.chat_message("assistant").write(f"I found the environment ({environment.upper()}) but couldn't identify the application. Please specify the application name.")
        elif application:
            st.chat_message("assistant").write(f"I found the application ({application.title()}) but couldn't identify the environment. Please specify: Dev, UAT, or Prod.")
        else:
            st.chat_message("assistant").write("Please specify both the environment (Dev/UAT/Prod) and application name for the smoke test.")
    else:
        st.chat_message("assistant").write("I'm sorry, I didn't understand that. Could you please rephrase?")
