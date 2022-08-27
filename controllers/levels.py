import pandas as pd
import numpy as np
import yfinance
from mpl_finance import candlestick_ohlc
import matplotlib.dates as mpl_dates
import matplotlib.pyplot as plt
plt.rcParams['figure.figsize'] = [12, 7]
plt.rc('font', size=14)

ticker = 'AAPL'
data = yfinance.Ticker(ticker)

df = data.history(interval="1d",start="2020-03-15", end="2021-02-22")
df['Date'] = pd.to_datetime(df.index)
df['Date'] = df['Date'].apply(mpl_dates.date2num)
df = df.loc[:,['Date', 'Open', 'High', 'Low', 'Close']]

def getSignal(price):
  df = price
  levels = []
  # for better support ranges 
  ## --- > getTwoLowerPriceSupport
  for i in range(2,df.shape[0]-2):
    if isSupport(df,i):
      levels.append((i,df['Low'][i]))
    elif isResistance(df,i):
      levels.append((i,df['High'][i]))
  s =  np.mean(df['High'] - df['Low'])
  levels = []
  for i in range(2,df.shape[0]-2):
    if isSupport(df,i):
      l = df['Low'][i]
      if isFarFromLevel(l, levels,s):
        levels.append((i,l))
    elif isResistance(df,i):
      l = df['High'][i]
      if isFarFromLevel(l, levels, s):
        levels.append((i,l))
  #plot_all(df, levels)
  distance_from_level = 0.01
  stop_loss_percent = 0.0025
  take_profit_percent=0.005
  current_level=100
  current_level_x=0
  position = []
  last_price=float(df['Close'].tail(1))
  
  for x in range(0,len(levels)):
      distance=abs(levels[x][1]-last_price)
      if float(current_level) > float(distance):
          current_level=distance
          current_level_x=x
  if (last_price-levels[current_level_x][1])>0:
      ###this means it is above the support and we are close to buying
      if levels[current_level_x][1]*(1+distance_from_level)>last_price:
          last_3_prices=(df['Close'].tail(3))
          last_3_prices = last_3_prices.array
          if (last_3_prices[0]>last_3_prices[1] and last_3_prices[1]<last_3_prices[2]) or (last_3_prices[0]<last_3_prices[1] and last_3_prices[1]<last_3_prices[2]):
              buying_price = float(last_price)  ###at what price we bought?
              take_profit = buying_price *(1+take_profit_percent)
              stop_loss= buying_price *(1-stop_loss_percent)
              position = {"Ticker": ticker,"Position": "Buy","BuyingPrice": buying_price,"TakeProfit": take_profit,"StopLoss": stop_loss}  
              return position
          else:
              return {}        
              
              
  else:
      ### this means the price is below the support line
      print("No")
      return {}

  # while len(position) != 0:
  #     current_price = float(last_price)-5 ###here goes the current price of the crypto
  #     #sleep(0.5)
  #     if current_price>=position['TakeProfit'] or current_price<=position['StopLoss']:
  #         print("SEEEEEEELL")
  #         position=[]



def isSupport(df,i):
  support = df['Low'][i] < df['Low'][i-1]  and df['Low'][i] < df['Low'][i+1] and df['Low'][i+1] < df['Low'][i+2] and df['Low'][i-1] < df['Low'][i-2]
  return support
def isResistance(df,i):
  resistance = df['High'][i] > df['High'][i-1]  and df['High'][i] > df['High'][i+1] and df['High'][i+1] > df['High'][i+2] and df['High'][i-1] > df['High'][i-2]
  return resistance

def plot_all(df, levels):
  fig, ax = plt.subplots()
  candlestick_ohlc(ax,df.values,width=0.6, \
                   colorup='green', colordown='red', alpha=0.8)
  date_format = mpl_dates.DateFormatter('%d %b %Y')
  ax.xaxis.set_major_formatter(date_format)
  fig.autofmt_xdate()
  fig.tight_layout()
  for level in levels:
    plt.hlines(level[1],xmin=df['Date'][level[0]],\
               xmax=max(df['Date']),colors='blue')
  fig.show()



def isFarFromLevel(l, levels, s):
   return np.sum([abs(l-x) < s  for x in levels]) == 0


def getTwoLowerPriceSupport: 
  support = df['Low'][i] < df['Low'][i-1]  and df['Low'][i] < df['Low'][i+1] and df['Low'][i+1] < df['Low'][i+2] and df['Low'][i-1] < df['Low'][i-2] and df['Low'][i-1] > df['Low'][i-2]
  return support 

