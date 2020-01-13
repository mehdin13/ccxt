'use strict';

// ---------------------------------------------------------------------------

const bitfinex = require ('./bitfinex.js');
const { ExchangeError, NotSupported, ArgumentsRequired, InsufficientFunds, AuthenticationError, OrderNotFound, InvalidOrder, BadSymbol, OnMaintenance } = require ('./base/errors');

// ---------------------------------------------------------------------------

module.exports = class bitfinex2 extends bitfinex {
    describe () {
        return this.deepExtend (super.describe (), {
            'id': 'bitfinex2',
            'name': 'Bitfinex',
            'countries': [ 'VG' ],
            'version': 'v2',
            'certified': false,
            // new metainfo interface
            'has': {
                'CORS': true,
                'cancelAllOrders': true,
                'createLimitOrder': true,
                'createMarketOrder': true,
                'createOrder': true,
                'cancelOrder': true,
                'deposit': false,
                'editOrder': false,
                'fetchDepositAddress': false,
                'fetchClosedOrders': false,
                'fetchFundingFees': false,
                'fetchMyTrades': true,
                'fetchOHLCV': true,
                'fetchOpenOrders': true,
                'fetchOrder': 'emulated', // no endpoint for a single open-or-closed order (just for an open/closed orders only)
                'fetchStatus': true,
                'fetchTickers': true,
                'fetchTradingFee': false,
                'fetchTradingFees': false,
                'withdraw': true,
            },
            'timeframes': {
                '1m': '1m',
                '5m': '5m',
                '15m': '15m',
                '30m': '30m',
                '1h': '1h',
                '3h': '3h',
                '6h': '6h',
                '12h': '12h',
                '1d': '1D',
                '1w': '7D',
                '2w': '14D',
                '1M': '1M',
            },
            'rateLimit': 1500,
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27766244-e328a50c-5ed2-11e7-947b-041416579bb3.jpg',
                'api': {
                    'v1': 'https://api.bitfinex.com',
                    'public': 'https://api-pub.bitfinex.com',
                    'private': 'https://api.bitfinex.com',
                },
                'www': 'https://www.bitfinex.com',
                'doc': [
                    'https://docs.bitfinex.com/v2/docs/',
                    'https://github.com/bitfinexcom/bitfinex-api-node',
                ],
                'fees': 'https://www.bitfinex.com/fees',
            },
            'api': {
                'v1': {
                    'get': [
                        'symbols',
                        'symbols_details',
                    ],
                },
                'public': {
                    'get': [
                        'conf/pub:map:currency:label',
                        'platform/status',
                        'tickers',
                        'ticker/{symbol}',
                        'trades/{symbol}/hist',
                        'book/{symbol}/{precision}',
                        'book/{symbol}/P0',
                        'book/{symbol}/P1',
                        'book/{symbol}/P2',
                        'book/{symbol}/P3',
                        'book/{symbol}/R0',
                        'stats1/{key}:{size}:{symbol}:{side}/{section}',
                        'stats1/{key}:{size}:{symbol}/{section}',
                        'stats1/{key}:{size}:{symbol}:long/last',
                        'stats1/{key}:{size}:{symbol}:long/hist',
                        'stats1/{key}:{size}:{symbol}:short/last',
                        'stats1/{key}:{size}:{symbol}:short/hist',
                        'candles/trade:{timeframe}:{symbol}/{section}',
                        'candles/trade:{timeframe}:{symbol}/last',
                        'candles/trade:{timeframe}:{symbol}/hist',
                    ],
                    'post': [
                        'calc/trade/avg',
                        'calc/fx',
                    ],
                },
                'private': {
                    'post': [
                        'auth/r/wallets',
                        'auth/r/orders/{symbol}',
                        'auth/r/orders/{symbol}/new',
                        'auth/r/orders/{symbol}/hist',
                        'auth/r/order/{symbol}:{id}/trades',
                        'auth/w/order/submit',
                        'auth/w/order/cancel',
                        'auth/w/order/cancel/multi',
                        'auth/r/trades/hist',
                        'auth/r/trades/{symbol}/hist',
                        'auth/r/positions',
                        'auth/r/positions/hist',
                        'auth/r/positions/audit',
                        'auth/r/funding/offers/{symbol}',
                        'auth/r/funding/offers/{symbol}/hist',
                        'auth/r/funding/loans/{symbol}',
                        'auth/r/funding/loans/{symbol}/hist',
                        'auth/r/funding/credits/{symbol}',
                        'auth/r/funding/credits/{symbol}/hist',
                        'auth/r/funding/trades/{symbol}/hist',
                        'auth/r/info/margin/{key}',
                        'auth/r/info/funding/{key}',
                        'auth/r/ledgers/hist',
                        'auth/r/movements/hist',
                        'auth/r/movements/{currency}/hist',
                        'auth/r/stats/perf:{timeframe}/hist',
                        'auth/r/alerts',
                        'auth/w/alert/set',
                        'auth/w/alert/{type}:{symbol}:{price}/del',
                        'auth/calc/order/avail',
                        'auth/r/ledgers/{symbol}/hist',
                        'auth/r/settings',
                        'auth/w/settings/set',
                        'auth/w/settings/del',
                        'auth/r/info/user',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'maker': 0.1 / 100,
                    'taker': 0.2 / 100,
                },
                'funding': {
                    'withdraw': {
                        'BTC': 0.0004,
                        'BCH': 0.0001,
                        'ETH': 0.00135,
                        'EOS': 0.0,
                        'LTC': 0.001,
                        'OMG': 0.15097,
                        'IOT': 0.0,
                        'NEO': 0.0,
                        'ETC': 0.01,
                        'XRP': 0.02,
                        'ETP': 0.01,
                        'ZEC': 0.001,
                        'BTG': 0.0,
                        'DASH': 0.01,
                        'XMR': 0.0001,
                        'QTM': 0.01,
                        'EDO': 0.23687,
                        'DAT': 9.8858,
                        'AVT': 1.1251,
                        'SAN': 0.35977,
                        'USDT': 5.0,
                        'SPK': 16.971,
                        'BAT': 1.1209,
                        'GNT': 2.8789,
                        'SNT': 9.0848,
                        'QASH': 1.726,
                        'YYW': 7.9464,
                    },
                },
            },
            'options': {
                'precision': 'R0', // P0, P1, P2, P3, P4, R0
                'orderTypes': {
                    'MARKET': undefined,
                    'EXCHANGE MARKET': 'market',
                    'LIMIT': undefined,
                    'EXCHANGE LIMIT': 'limit',
                    'STOP': undefined,
                    'EXCHANGE STOP': 'stopOrLoss',
                    'TRAILING STOP': undefined,
                    'EXCHANGE TRAILING STOP': undefined,
                    'FOK': undefined,
                    'EXCHANGE FOK': 'limit FOK',
                    'STOP LIMIT': undefined,
                    'EXCHANGE STOP LIMIT': 'limit stop',
                    'IOC': undefined,
                    'EXCHANGE IOC': 'limit ioc',
                },
                'fiat': {
                    'USD': 'USD',
                    'EUR': 'EUR',
                    'JPY': 'JPY',
                    'GBP': 'GBP',
                },
                // If set true strongly recommend set enableRateLimit:true
                // Call fetchOrder after creating to update status, trades, fees, etc
                'fetchOrderOnCreate': false,
            },
        });
    }

    isFiat (code) {
        return (code in this.options['fiat']);
    }

    getCurrencyId (code) {
        return 'f' + code;
    }

    async fetchStatus (params = {}) {
        // [1]=operative, [0]=maintenance
        const response = await this.publicGetPlatformStatus (params);
        const formattedStatus = (response[0] === 1) ? 'ok' : 'maintenance';
        this.status = this.extend (this.status, {
            'status': formattedStatus,
            'updated': this.milliseconds (),
        });
        return this.status;
    }

    async fetchMarkets (params = {}) {
        const response = await this.v1GetSymbolsDetails (params);
        const result = [];
        for (let i = 0; i < response.length; i++) {
            const market = response[i];
            let id = this.safeString (market, 'pair');
            id = id.toUpperCase ();
            let baseId = undefined;
            let quoteId = undefined;
            if (id.indexOf (':') >= 0) {
                const parts = id.split (':');
                baseId = parts[0];
                quoteId = parts[1];
            } else {
                baseId = id.slice (0, 3);
                quoteId = id.slice (3, 6);
            }
            const base = this.safeCurrencyCode (baseId);
            const quote = this.safeCurrencyCode (quoteId);
            const symbol = base + '/' + quote;
            id = 't' + id;
            baseId = this.getCurrencyId (baseId);
            quoteId = this.getCurrencyId (quoteId);
            const precision = {
                'price': this.safeInteger (market, 'price_precision'),
                'amount': this.safeInteger (market, 'price_precision'),
            };
            const limits = {
                'amount': {
                    'min': this.safeFloat (market, 'minimum_order_size'),
                    'max': this.safeFloat (market, 'maximum_order_size'),
                },
                'price': {
                    'min': Math.pow (10, -precision['price']),
                    'max': Math.pow (10, precision['price']),
                },
            };
            limits['cost'] = {
                'min': limits['amount']['min'] * limits['price']['min'],
                'max': undefined,
            };
            result.push ({
                'id': id,
                'symbol': symbol,
                'base': base,
                'quote': quote,
                'baseId': baseId,
                'quoteId': quoteId,
                'active': true,
                'precision': precision,
                'limits': limits,
                'info': market,
                'swap': false,
                'spot': false,
                'futures': false,
            });
        }
        return result;
    }

    async fetchBalance (params = {}) {
        // this api call does not return the 'used' amount - use the v1 version instead (which also returns zero balances)
        await this.loadMarkets ();
        const response = await this.privatePostAuthRWallets (params);
        const balanceType = this.safeString (params, 'type', 'exchange');
        const result = { 'info': response };
        for (let b = 0; b < response.length; b++) {
            const balance = response[b];
            const accountType = balance[0];
            let currency = balance[1];
            const total = balance[2];
            const available = balance[4];
            if (accountType === balanceType) {
                if (currency[0] === 't') {
                    currency = currency.slice (1);
                }
                const code = this.safeCurrencyCode (currency);
                const account = this.account ();
                // do not fill in zeroes and missing values in the parser
                // rewrite and unify the following to use the unified parseBalance
                account['total'] = total;
                if (!available) {
                    if (available === 0) {
                        account['free'] = 0;
                        account['used'] = total;
                    } else {
                        account['free'] = total;
                    }
                } else {
                    account['free'] = available;
                    account['used'] = account['total'] - account['free'];
                }
                result[code] = account;
            }
        }
        return this.parseBalance (result);
    }

    async fetchOrderBook (symbol, limit = undefined, params = {}) {
        await this.loadMarkets ();
        const precision = this.safeValue (this.options, 'precision', 'R0');
        const request = {
            'symbol': this.marketId (symbol),
            'precision': precision,
        };
        if (limit !== undefined) {
            request['len'] = limit; // 25 or 100
        }
        const fullRequest = this.extend (request, params);
        const orderbook = await this.publicGetBookSymbolPrecision (fullRequest);
        const timestamp = this.milliseconds ();
        const result = {
            'bids': [],
            'asks': [],
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'nonce': undefined,
        };
        const priceIndex = (fullRequest['precision'] === 'R0') ? 1 : 0;
        for (let i = 0; i < orderbook.length; i++) {
            const order = orderbook[i];
            const price = order[priceIndex];
            const amount = Math.abs (order[2]);
            const side = (order[2] > 0) ? 'bids' : 'asks';
            result[side].push ([ price, amount ]);
        }
        result['bids'] = this.sortBy (result['bids'], 0, true);
        result['asks'] = this.sortBy (result['asks'], 0);
        return result;
    }

    parseTicker (ticker, market = undefined) {
        const timestamp = this.milliseconds ();
        let symbol = undefined;
        if (market !== undefined) {
            symbol = market['symbol'];
        }
        const length = ticker.length;
        const last = ticker[length - 4];
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'high': ticker[length - 2],
            'low': ticker[length - 1],
            'bid': ticker[length - 10],
            'bidVolume': undefined,
            'ask': ticker[length - 8],
            'askVolume': undefined,
            'vwap': undefined,
            'open': undefined,
            'close': last,
            'last': last,
            'previousClose': undefined,
            'change': ticker[length - 6],
            'percentage': ticker[length - 5] * 100,
            'average': undefined,
            'baseVolume': ticker[length - 3],
            'quoteVolume': undefined,
            'info': ticker,
        };
    }

    async fetchTickers (symbols = undefined, params = {}) {
        await this.loadMarkets ();
        const request = {};
        if (symbols !== undefined) {
            const ids = this.marketIds (symbols);
            request['symbols'] = ids.join (',');
        } else {
            request['symbols'] = 'ALL';
        }
        const tickers = await this.publicGetTickers (this.extend (request, params));
        const result = {};
        for (let i = 0; i < tickers.length; i++) {
            const ticker = tickers[i];
            const id = ticker[0];
            if (id in this.markets_by_id) {
                const market = this.markets_by_id[id];
                const symbol = market['symbol'];
                result[symbol] = this.parseTicker (ticker, market);
            }
        }
        return result;
    }

    async fetchTicker (symbol, params = {}) {
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            'symbol': market['id'],
        };
        const ticker = await this.publicGetTickerSymbol (this.extend (request, params));
        return this.parseTicker (ticker, market);
    }

    parseTrade (trade, market = undefined) {
        //
        // fetchTrades (public)
        //
        //     [
        //         ID,
        //         MTS, // timestamp
        //         AMOUNT,
        //         PRICE
        //     ]
        //
        // fetchMyTrades (private)
        //
        //     [
        //         ID,
        //         PAIR,
        //         MTS_CREATE,
        //         ORDER_ID,
        //         EXEC_AMOUNT,
        //         EXEC_PRICE,
        //         ORDER_TYPE,
        //         ORDER_PRICE,
        //         MAKER,
        //         FEE,
        //         FEE_CURRENCY,
        //         ...
        //     ]
        //
        const tradeLength = trade.length;
        const isPrivate = (tradeLength > 5);
        const id = trade[0].toString ();
        const amountIndex = isPrivate ? 4 : 2;
        let amount = trade[amountIndex];
        let cost = undefined;
        const priceIndex = isPrivate ? 5 : 3;
        const price = trade[priceIndex];
        let side = undefined;
        let orderId = undefined;
        let takerOrMaker = undefined;
        let type = undefined;
        let fee = undefined;
        let symbol = undefined;
        const timestampIndex = isPrivate ? 2 : 1;
        const timestamp = trade[timestampIndex];
        if (isPrivate) {
            const marketId = trade[1];
            if (marketId !== undefined) {
                if (marketId in this.markets_by_id) {
                    market = this.markets_by_id[marketId];
                    symbol = market['symbol'];
                } else {
                    symbol = marketId;
                }
            }
            orderId = trade[3].toString ();
            takerOrMaker = (trade[8] === 1) ? 'maker' : 'taker';
            const feeCost = trade[9];
            const feeCurrency = this.safeCurrencyCode (trade[10]);
            if (feeCost !== undefined) {
                fee = {
                    'cost': parseFloat (this.feeToPrecision (symbol, Math.abs (feeCost))),
                    'currency': feeCurrency,
                };
            }
            const orderType = trade[6];
            type = this.safeString (this.options['orderTypes'], orderType);
        }
        if (symbol === undefined) {
            if (market !== undefined) {
                symbol = market['symbol'];
            }
        }
        if (amount !== undefined) {
            side = (amount < 0) ? 'sell' : 'buy';
            amount = Math.abs (amount);
            if (cost === undefined) {
                if (price !== undefined) {
                    cost = amount * price;
                }
            }
        }
        return {
            'id': id,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'symbol': symbol,
            'order': orderId,
            'side': side,
            'type': type,
            'takerOrMaker': takerOrMaker,
            'price': price,
            'amount': amount,
            'cost': cost,
            'fee': fee,
            'info': trade,
        };
    }

    async fetchTrades (symbol, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets ();
        const market = this.market (symbol);
        let sort = '-1';
        const request = {
            'symbol': market['id'],
        };
        if (since !== undefined) {
            request['start'] = since;
            sort = '1';
        }
        if (limit !== undefined) {
            request['limit'] = limit; // default 120, max 5000
        }
        request['sort'] = sort;
        const response = await this.publicGetTradesSymbolHist (this.extend (request, params));
        //
        //     [
        //         [
        //             ID,
        //             MTS, // timestamp
        //             AMOUNT,
        //             PRICE
        //         ]
        //     ]
        //
        const trades = this.sortBy (response, 1);
        return this.parseTrades (trades, market, undefined, limit);
    }

    async fetchOHLCV (symbol, timeframe = '1m', since = undefined, limit = 100, params = {}) {
        await this.loadMarkets ();
        const market = this.market (symbol);
        if (limit === undefined) {
            limit = 100; // default 100, max 5000
        }
        if (since === undefined) {
            since = this.milliseconds () - this.parseTimeframe (timeframe) * limit * 1000;
        }
        const request = {
            'symbol': market['id'],
            'timeframe': this.timeframes[timeframe],
            'sort': 1,
            'start': since,
            'limit': limit,
        };
        const response = await this.publicGetCandlesTradeTimeframeSymbolHist (this.extend (request, params));
        return this.parseOHLCVs (response, market, timeframe, since, limit);
    }

    parseOrderStatus (status) {
        if (status === 'ACTIVE') {
            return 'open';
        } else if (status.indexOf ('PARTIALLY FILLED') === 0) {
            // PARTIALLY FILLED @ 107.6(-0.2)
            return 'open';
        } else if (status.indexOf ('EXECUTED') === 0) {
            // EXECUTED @ 107.6(-0.2)
            return 'closed';
        } else if (status.indexOf ('CANCELED') === 0) {
            return 'canceled';
        } else if (status.indexOf ('INSUFFICIENT MARGIN') === 0) {
            return 'rejected';  // ???
        } else if (status.indexOf ('RSN_DUST') === 0) {
            return 'rejected';  // ???
        } else if (status.indexOf ('RSN_PAUSE') === 0) {
            return 'rejected';  // ???
        }
        return status;
    }

    parseOrder (order, market = undefined) {
        const id = order[0];
        let symbol = undefined;
        const marketId = order[3];
        if (marketId in this.markets_by_id) {
            market = this.markets_by_id[marketId];
        }
        if (market !== undefined) {
            symbol = market['symbol'];
        }
        const timestamp = order[5];
        const remaining = Math.abs (order[6]);
        const amount = Math.abs (order[7]);
        const filled = amount - remaining;
        const side = (order[7] < 0) ? 'sell' : 'buy';
        const type = this.safeString (this.options.orderTypes, order[8]);
        const status = this.parseOrderStatus (order[13]);
        const price = order[16];
        const average = order[17];
        const cost = price * filled;
        return {
            'info': order,
            'id': id,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'lastTradeTimestamp': undefined,
            'symbol': symbol,
            'type': type,
            'side': side,
            'price': price,
            'amount': amount,
            'cost': cost,
            'average': average,
            'filled': filled,
            'remaining': remaining,
            'status': status,
            'fee': undefined,
            'trades': undefined,
        };
    }

    async createOrder (symbol, type, side, amount, price = undefined, params = {}) {
        await this.loadMarkets ();
        const market = this.market (symbol);
        const orderTypes = this.options['orderTypes'];
        let orderType = undefined;
        const nativeOrderTypes = Object.keys (orderTypes);
        for (let i = 0; i < nativeOrderTypes.length; i++) {
            const key = nativeOrderTypes[i];
            if ((orderTypes[key] !== undefined) && (orderTypes[key] === type)) {
                orderType = key;
                break;
            }
        }
        // Amount and price should be strings (not numbers)
        const request = {
            'symbol': market['id'],
            'type': orderType,
            'amount': ('' + amount),
        };
        if (side === 'sell') {
            request['amount'] = '-' + request['amount'];
        }
        if (type !== 'market') {
            request['price'] = '' + price;
        }
        const response = await this.privatePostAuthWOrderSubmit (this.extend (request, params));
        // [
        //   1578784364.748,    // Millisecond Time Stamp of the update
        //   "on-req",          // Purpose of notification ('on-req', 'oc-req', 'uca', 'fon-req', 'foc-req')
        //   null,              // Unique ID of the message
        //   null,              // Ignore
        //   [
        //     [
        //       37271830598,           // Order ID
        //       null,                  // Group ID
        //       1578784364748,         // Client Order ID
        //       "tBTCUST",             // Pair
        //       1578784364748,         // Millisecond timestamp of creation
        //       1578784364748,         // Millisecond timestamp of update
        //       -0.005,                // Positive means buy, negative means sell
        //       -0.005,                // Original amount
        //       "EXCHANGE LIMIT",      // Order type (LIMIT, MARKET, STOP, TRAILING STOP, EXCHANGE MARKET, EXCHANGE LIMIT, EXCHANGE STOP, EXCHANGE TRAILING STOP, FOK, EXCHANGE FOK, IOC, EXCHANGE IOC)
        //       null,                  // Previous order type
        //       null,                  // Millisecond timestamp of Time-In-Force: automatic order cancellation
        //       null,                  // Ignore
        //       0,                     // Flags (see https://docs.bitfinex.com/docs/flag-values)
        //       "ACTIVE",              // Order Status
        //       null,                  // Ignore
        //       null,                  // Ignore
        //       20000,                 // Price
        //       0,                     // Average price
        //       0,                     // The trailing price
        //       0,                     // Auxiliary Limit price (for STOP LIMIT)
        //       null,                  // Ignore
        //       null,                  // Ignore
        //       null,                  // Ignore
        //       0,                     // 1 - hidden order
        //       null,                  // If another order caused this order to be placed (OCO) this will be that other order's ID
        //       null,                  // Ignore
        //       null,                  // Ignore
        //       null,                  // Ignore
        //       "API>BFX",             // Origin of action: BFX, ETHFX, API>BFX, API>ETHFX
        //       null,                  // Ignore
        //       null,                  // Ignore
        //       null                   // Meta
        //     ]
        //   ],
        //   null,                  // Error code
        //   "SUCCESS",             // Status (SUCCESS, ERROR, FAILURE, ...)
        //   "Submitting 1 orders." // Text of the notification
        // ]
        if (response[6] !== 'SUCCESS') {
            const errorCode = response[5];
            const errorText = response[7];
            throw new ExchangeError (this.id + ' ' + response[6] + ': ' + errorText + ' (#' + errorCode + ')');
        }
        const order = this.parseOrder (response[4][0]);
        if (this.options['fetchOrderOnCreate']) {
            return await this.fetchOrder (order['id'], order['symbol']);
        }
        return order;
    }

    async cancelAllOrders (symbol = undefined, params = {}) {
        const request = {
            'all': 1,
        };
        const response = await this.privatePostAuthWOrderCancelMulti (this.extend (request, params));
        const orders = response[4];
        return this.parseOrders (orders);
    }

    async cancelOrder (id, symbol = undefined, params = {}) {
        const request = {
            'id': id,
        };
        // Also can cancel order by Client Order ID and Client Order ID Date (cid and cid_date in params)
        const response = await this.privatePostAuthWOrderCancel (this.extend (request, params));
        const order = response[4];
        return this.parseOrder (order);
    }

    calculateOrderFee (order) {
        if ((this.isArray (order['trades'])) && (order['trades'].length > 0)) {
            const symbol = order['trades'][0]['fee']['currency'];
            const fee = {
                'currency': symbol,
                'cost': 0,
            };
            for (let i = 0; i < order['trades'].length; i++) {
                fee['cost'] += order['trades'][i]['fee']['cost'];
            }
            fee['cost'] = parseFloat (this.feeToPrecision (order['symbol'], fee['cost']));
            order['fee'] = fee;
        }
        return order;
    }

    async fetchOrder (id, symbol = undefined, params = {}) {
        if (symbol === undefined) {
            throw new ArgumentsRequired (this.id + ' fetchOrder requires a symbol argument');
        }
        const filter = this.extend ({ 'id': [id] }, params);
        const openOrders = await this.fetchOpenOrders (symbol, undefined, undefined, filter);
        if ((this.isArray (openOrders)) && (openOrders.length > 0)) {
            const order = openOrders[0];
            order['trades'] = await this.fetchOrderTrades (id, symbol);
            this.calculateOrderFee (order);
            return order;
        }
        const closedOrders = await this.fetchClosedOrders (symbol, undefined, undefined, filter);
        if ((this.isArray (closedOrders)) && (closedOrders.length > 0)) {
            const order = closedOrders[0];
            order['trades'] = await this.fetchOrderTrades (id, symbol);
            this.calculateOrderFee (order);
            return order;
        }
        throw new OrderNotFound (this.id + ' Order not found.');
    }

    async fetchOpenOrders (symbol = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            'symbol': market['id'],
        };
        const response = await this.privatePostAuthROrdersSymbol (this.extend (request, params));
        return this.parseOrders (response, market, since, limit);
    }

    async fetchClosedOrders (symbol = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            'symbol': market['id'],
        };
        // Returns the most recent closed or canceled orders up to circa two weeks ago
        const response = await this.privatePostAuthROrdersSymbolHist (this.extend (request, params));
        return this.parseOrders (response, market, since, limit);
    }

    async fetchOrderTrades (id, symbol, params = {}) {
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            'id': id,
            'symbol': market['id'],
        };
        // Valid for trades upto 10 days old
        const response = await this.privatePostAuthROrderSymbolIdTrades (this.extend (request, params));
        return this.parseTrades (response, market);
    }

    async fetchDepositAddress (currency, params = {}) {
        throw new NotSupported (this.id + ' fetchDepositAddress() not implemented yet.');
    }

    async withdraw (code, amount, address, tag = undefined, params = {}) {
        throw new NotSupported (this.id + ' withdraw not implemented yet');
    }

    async fetchMyTrades (symbol = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets ();
        let market = undefined;
        const request = {
            'end': this.milliseconds (),
        };
        if (since !== undefined) {
            request['start'] = since;
        }
        if (limit !== undefined) {
            request['limit'] = limit; // default 25, max 1000
        }
        let method = 'privatePostAuthRTradesHist';
        if (symbol !== undefined) {
            market = this.market (symbol);
            request['symbol'] = market['id'];
            method = 'privatePostAuthRTradesSymbolHist';
        }
        const response = await this[method] (this.extend (request, params));
        return this.parseTrades (response, market, since, limit);
    }

    nonce () {
        return this.milliseconds ();
    }

    sign (path, api = 'public', method = 'GET', params = {}, headers = undefined, body = undefined) {
        let request = '/' + this.implodeParams (path, params);
        const query = this.omit (params, this.extractParams (path));
        if (api === 'v1') {
            request = api + request;
        } else {
            request = this.version + request;
        }
        let url = this.urls['api'][api] + '/' + request;
        if (api === 'public') {
            if (Object.keys (query).length) {
                url += '?' + this.urlencode (query);
            }
        }
        if (api === 'private') {
            this.checkRequiredCredentials ();
            const nonce = this.nonce ().toString ();
            body = this.json (query);
            const auth = '/api/' + request + nonce + body;
            const signature = this.hmac (this.encode (auth), this.encode (this.secret), 'sha384');
            headers = {
                'bfx-nonce': nonce,
                'bfx-apikey': this.apiKey,
                'bfx-signature': signature,
                'Content-Type': 'application/json',
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    }

    async request (path, api = 'public', method = 'GET', params = {}, headers = undefined, body = undefined) {
        const response = await this.fetch2 (path, api, method, params, headers, body);
        if (response) {
            if ('message' in response) {
                if (response['message'].indexOf ('not enough exchange balance') >= 0) {
                    throw new InsufficientFunds (this.id + ' ' + this.json (response));
                }
                throw new ExchangeError (this.id + ' ' + this.json (response));
            }
            return response;
        } else if (response === '') {
            throw new ExchangeError (this.id + ' returned empty response');
        }
        return response;
    }

    handleErrors (statusCode, statusText, url, method, responseHeaders, responseBody, response, requestHeaders, requestBody) {
        if (statusCode === 500) {
            // See https://docs.bitfinex.com/docs/abbreviations-glossary#section-errorinfo-codes
            const errorCode = response[1];
            const errorText = response[2];
            if (errorCode === 10100) {
                throw new AuthenticationError (this.id + ' ' + errorText);
            } else if (errorCode === 20060) {
                throw new OnMaintenance (this.id + ' Exchange on maintenance');
            } else if (errorText.indexOf ('Invalid order: not enough exchange balance') === 0) {
                throw new InsufficientFunds (this.id + ' ' + errorText);
            } else if (errorText.indexOf ('Invalid order') === 0) {
                throw new InvalidOrder (this.id + ' ' + errorText);
            } else if (errorText.indexOf ('Order not found') === 0) {
                throw new OrderNotFound (this.id + ' ' + errorText);
            } else if (errorText.indexOf ('symbol: invalid') === 0) {
                throw new BadSymbol (this.id + ' Invalid symbol');
            } else {
                throw new ExchangeError (this.id + ' ' + errorText + ' (#' + errorCode + ')');
            }
        }
    }
};
