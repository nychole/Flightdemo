class FlightGoogle
  require "date"
  require "watir-webdriver"
  require "csv"

  @@dtReserve = Date.today.to_s
  attr_accessor :obCity
  attr_accessor :ibCity
  attr_accessor :obDate
  attr_accessor :ibDate
  def initialize(obCity,ibCity,obDate,ibDate)
    @obCity=obCity  #depart city
    @ibCity=ibCity  #arrival city
    @obDate=obDate  #yyyy-mm-dd
    @ibDate=ibDate  #yyyy-mm-dd
  end
  def getURL
    return "https://www.google.fr/flights/#search;f=#{@obCity};t=#{@ibCity};d=#{@obDate};r=#{@ibDate};so=p;eo=e"
  end
  def gotob
    url = getURL
    @b = Watir::Browser.new(:ie)
    @b.goto url
    @b.driver.manage.timeouts.implicit_wait = 3 #3 seconds
  end
  def getData(id)
    dataArr = []
    d = @b.divs :class => id
    d.each do |x|
      dataArr << x.text
    end
    return dataArr
  end

  def getAllData #GJJKPX2CEC
    dataArr = Hash.new
    #d = @b.divs :class => "gwt-HTML"
    d = @b.elements :class => /^GJJKPX2CEC/
    r=0
    d.each do |parent_level|
      puts parent_level.div(:class => 'GJJKPX2JFC').text
      #dataArr[r] = x.text
      r+=1
    end
    return dataArr
  end

  def getReport
    puts "this is the report as of #{@@dtReserve}..."
    @report = Hash.new
    @report['dtPrice'] = getData('GJJKPX2JFC').collect { |x| x.gsub(/\D/,'').to_i }
    nbRow = @report['dtPrice'].collect.size
    @report['dtComp'] = getData('GJJKPX2PCC')[1..nbRow]
    @report['dtHours'] = getData('GJJKPX2KDC')[1..nbRow]
    @report['dtTrans'] = getData('GJJKPX2FGC')[1..nbRow]

    return @report
  end

  def dupVect(arr,num)
    temp = []
    num.times {temp << arr.to_s}
    return temp
  end
  def closeb
    @b.quit
  end
end
