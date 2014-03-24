class FlightGoogle
  require "date"
  require "watir-webdriver"
  require "csv"
  require "watir-nokogiri"
  require 'timeout'

  @@dtReserve = Date.today.to_s
  attr_accessor :obCity
  attr_accessor :ibCity
  attr_accessor :obDate
  attr_accessor :ibDate
  attr_accessor :alTable

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
    url = self.getURL
    puts 'gotob'
    begin
      @b = Watir::Browser.new(:ie)
      complete_results = Timeout.timeout(5) do
        @b.goto url
        @b.driver.manage.timeouts.implicit_wait = 2 #3 seconds
        if @b.div(:text => "aller-retour").exist? then
          @doc = Nokogiri::HTML(@b.html)
        end
      end
    rescue StandardError,Timeout::Error
      @b.quit
      retry
    end
    #puts @b.text
  end

  def getnbRow
    return @doc.xpath("(//a/div/div[position()=1])").count
  end
  def getNoko(r)
    dataArr = Hash.new
    dataArr[:dtPrice] = @doc.xpath("(//a/div[position()=1])[#{r}]").text.gsub(/[^\d]/,"").to_i
    dataArr[:dtComp] = @doc.xpath("(//a/div[position()=2])[#{r}]").text.gsub(/[^a-zA-Z ]/,'').gsub(/ +/,' ')
    dataArr[:dtHours] = @doc.xpath("(//a/div[position()=3])[#{r}]").text.split(/[^\d]/).delete_if(&:empty?).join('h')
    dataArr[:dtTrans] = @doc.xpath("(//a/div[position()=4])[#{r}]").text
    return dataArr
  end

  def getData(id)
    dataArr = []
    begin
      d = @b.divs :class => id
      d.each do |x|
        dataArr << x.text
      end
    rescue
      @b.quit
      r = 0
      d = @b.divs :class => id
      d.each do |x|
        r += 1
        if r < 999 then
          dataArr << x.text
        else
          break
        end
      end
    rescue
      self.closeb
      self.gotob
      retry
    end
    return dataArr
  end

  def getAllData #GJJKPX2CEC
    dataArr = Hash.new
    test =[]
    dataArr['test']=[]
    dataArr['test2']=[]

    r=0
    a = @b.div(:text => "aller-retour", :index=>0).parent
    a = a.parent until a.tag_name == 'a'
    a.divs.map {|x| test << x.text }
    dataArr['test1'] = test
    puts "test1 ... #{dataArr['test1']}"
    test.delete_if {|i| i.include? "\n"} # use double quote instead of single quote
    dataArr['test2'] = test
    puts "test2 ... #{dataArr['test2']}"
  end

  def getAllTable
    @alTable = @b.divs(:text => "aller-retour")
    return @alTable
  end

  def getAllData(row) #row should start from zero
    dataArr = Hash.new
    temp =[]
    alTable = @alTable
    a = alTable[row].parent
    a = a.parent until a.tag_name == 'a'
    a.divs.map {|x| temp << x.text }
    temp.delete_if {|i| i.include? "\n"}
    dataArr[:dtprice] = temp[0].gsub(/\D/,'').to_i
    dataArr[:dtComp] = temp[3]
    dataArr[:dtHours] = temp[4]
    dataArr[:dtTransit] = [temp[6]]#,temp[7]]
    return dataArr
  end


  def getReport #static name matching
    puts "this is the report as of #{@@dtReserve}..."
    @report = Hash.new
    @report[:dtPrice] = getData('GJJKPX2JFC').collect { |x| x.gsub(/\D/,'').to_i }
    nbRow = @report[:dtPrice].collect.size
    @report[:dtComp] = getData('GJJKPX2PCC')[1..nbRow]
    @report[:dtHours] = getData('GJJKPX2KDC')[1..nbRow]
    @report[:dtTrans] = getData('GJJKPX2FGC')[1..nbRow]
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
