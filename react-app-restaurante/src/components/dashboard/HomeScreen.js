import React from "react";

export const HomeScreen = () => {
  return (
    <>
      <div className="block animate__animated animate__fadeIn">
        <div className="column">
          <h1 className="title">Dashboard</h1>
        </div>
        <div className="column">
          <div className="card">
            <div className="card-content">
              <div className="content">
                <div className="columns">
                  <div className="column">
                    <div className="card">
                      <div className="card-content">
                        <p className="title">
                          <i className="fas fa-city fa-5x"></i>
                        </p>
                        <p className="subtitle">
                          <a>Resturantes</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
