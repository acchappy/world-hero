<GameProjectFile>
  <PropertyGroup Type="Scene" Name="herostrengthenscene" ID="691af15e-bde9-4ba5-af66-ed1d3e057de4" Version="2.3.2.3" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="0" Speed="1.0000" />
      <ObjectData Name="Scene" Tag="44" ctype="GameNodeObjectData">
        <Size X="960.0000" Y="640.0000" />
        <Children>
          <AbstractNodeData Name="Image_bg" CanEdit="False" ActionTag="1199750991" Tag="45" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="-32.0000" RightMargin="-32.0000" TopMargin="13.0000" BottomMargin="13.0000" Scale9Width="1024" Scale9Height="615" ctype="ImageViewObjectData">
            <Size X="1024.0000" Y="614.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="480.0000" Y="320.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.5000" />
            <PreSize X="1.0667" Y="0.9594" />
            <FileData Type="Normal" Path="background/bg3.jpg" Plist="" />
          </AbstractNodeData>
          <AbstractNodeData Name="Image_2" CanEdit="False" ActionTag="-641441273" CallBackType="Click" Tag="46" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" RightMargin="776.0000" BottomMargin="585.0000" Scale9Width="184" Scale9Height="55" ctype="ImageViewObjectData">
            <Size X="184.0000" Y="55.0000" />
            <AnchorPoint ScaleY="1.0000" />
            <Position Y="640.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition Y="1.0000" />
            <PreSize X="0.1917" Y="0.0859" />
            <FileData Type="Normal" Path="herostrengthenscene/es_scenename.png" Plist="" />
          </AbstractNodeData>
          <AbstractNodeData Name="Panel_main" CanEdit="False" ActionTag="649788413" Tag="48" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="80.0000" RightMargin="80.0000" TopMargin="70.0000" BottomMargin="70.0000" TouchEnable="True" BackColorAlpha="203" ColorAngle="90.0000" ctype="PanelObjectData">
            <Size X="800.0000" Y="500.0000" />
            <Children>
              <AbstractNodeData Name="Panel_hero" CanEdit="False" ActionTag="-1856052319" Tag="49" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="50.0000" RightMargin="50.0000" BottomMargin="410.0000" TouchEnable="True" BackColorAlpha="204" ComboBoxIndex="1" ColorAngle="90.0000" ctype="PanelObjectData">
                <Size X="700.0000" Y="90.0000" />
                <Children>
                  <AbstractNodeData Name="ScrollView_hero" ActionTag="-1241133956" Tag="271" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" TouchEnable="True" ClipAble="True" BackColorAlpha="102" ComboBoxIndex="1" ColorAngle="90.0000" IsBounceEnabled="True" ScrollDirectionType="Horizontal" ctype="ScrollViewObjectData">
                    <Size X="700.0000" Y="90.0000" />
                    <Children>
                      <AbstractNodeData Name="Image_hero" ActionTag="559422313" Tag="55" IconVisible="False" VerticalEdge="BothEdge" RightMargin="604.0000" TopMargin="-2.5000" BottomMargin="-2.5000" Scale9Width="96" Scale9Height="95" ctype="ImageViewObjectData">
                        <Size X="96.0000" Y="95.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="48.0000" Y="45.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.0686" Y="0.5000" />
                        <PreSize X="0.1371" Y="0.3167" />
                        <FileData Type="Normal" Path="herostrengthenscene/es_heroicon.png" Plist="" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="350.0000" Y="45.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5000" />
                    <PreSize X="1.0000" Y="1.0000" />
                    <SingleColor A="255" R="255" G="150" B="100" />
                    <FirstColor A="255" R="255" G="150" B="100" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                    <InnerNodeSize Width="700" Height="90" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Image_scrollLeft" ActionTag="2080949323" Tag="272" RotationSkewX="90.0000" RotationSkewY="90.0000" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="-28.5300" RightMargin="703.5300" TopMargin="34.5000" BottomMargin="34.5000" Scale9Width="25" Scale9Height="21" ctype="ImageViewObjectData">
                    <Size X="25.0000" Y="21.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="-16.0300" Y="45.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="-0.0229" Y="0.5000" />
                    <PreSize X="0.0357" Y="0.2333" />
                    <FileData Type="Normal" Path="herostrengthenscene/es_arrow.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Image_scrollRight" ActionTag="1676792998" Tag="273" RotationSkewX="270.0000" RotationSkewY="270.0000" IconVisible="False" HorizontalEdge="BothEdge" LeftMargin="701.5000" RightMargin="-26.5000" TopMargin="29.5000" BottomMargin="39.5000" Scale9Width="25" Scale9Height="21" ctype="ImageViewObjectData">
                    <Size X="25.0000" Y="21.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="714.0000" Y="50.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="1.0200" Y="0.5556" />
                    <PreSize X="0.0357" Y="0.2333" />
                    <FileData Type="Normal" Path="herostrengthenscene/es_arrow.png" Plist="" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="1.0000" />
                <Position X="400.0000" Y="500.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="1.0000" />
                <PreSize X="0.8750" Y="0.1800" />
                <SingleColor A="255" R="77" G="77" B="77" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
              <AbstractNodeData Name="Panel_strengthen" CanEdit="False" ActionTag="90557971" Tag="52" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" TopMargin="100.0000" TouchEnable="True" BackColorAlpha="217" ComboBoxIndex="1" ColorAngle="90.0000" ctype="PanelObjectData">
                <Size X="800.0000" Y="400.0000" />
                <Children>
                  <AbstractNodeData Name="Panel_content" CanEdit="False" ActionTag="-1796097179" Tag="81" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="128.0000" RightMargin="-8.0000" TouchEnable="True" BackColorAlpha="102" ComboBoxIndex="1" ColorAngle="90.0000" ctype="PanelObjectData">
                    <Size X="680.0000" Y="400.0000" />
                    <Children>
                      <AbstractNodeData Name="Panel_tab" CanEdit="False" ActionTag="-1153848943" Tag="82" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="-100.0000" RightMargin="680.0000" TopMargin="10.0000" BottomMargin="10.0000" TouchEnable="True" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                        <Size X="100.0000" Y="380.0000" />
                        <Children>
                          <AbstractNodeData Name="Image_tab1" ActionTag="-2092669884" Tag="93" IconVisible="False" LeftMargin="-38.5047" RightMargin="-1.4953" TopMargin="18.6617" BottomMargin="306.3383" Scale9Width="140" Scale9Height="55" ctype="ImageViewObjectData">
                            <Size X="140.0000" Y="55.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="31.4953" Y="333.8383" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.3150" Y="0.8785" />
                            <PreSize X="1.4000" Y="0.1447" />
                            <FileData Type="Normal" Path="herostrengthenscene/es_tagstrong.png" Plist="" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="Image_tab2" ActionTag="-485636746" Tag="100" IconVisible="False" LeftMargin="-38.5047" RightMargin="-1.4953" TopMargin="89.7272" BottomMargin="235.2728" Scale9Width="140" Scale9Height="55" ctype="ImageViewObjectData">
                            <Size X="140.0000" Y="55.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="31.4953" Y="262.7728" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.3150" Y="0.6915" />
                            <PreSize X="1.4000" Y="0.1447" />
                            <FileData Type="Normal" Path="herostrengthenscene/es_tagstrong.png" Plist="" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="Image_tab3" ActionTag="184135157" Tag="101" IconVisible="False" LeftMargin="-38.5047" RightMargin="-1.4953" TopMargin="160.7928" BottomMargin="164.2072" Scale9Width="140" Scale9Height="55" ctype="ImageViewObjectData">
                            <Size X="140.0000" Y="55.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="31.4953" Y="191.7072" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.3150" Y="0.5045" />
                            <PreSize X="1.4000" Y="0.1447" />
                            <FileData Type="Normal" Path="herostrengthenscene/es_tagstrong.png" Plist="" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleX="1.0000" ScaleY="0.5000" />
                        <Position Y="200.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition Y="0.5000" />
                        <PreSize X="0.1471" Y="0.9500" />
                        <SingleColor A="255" R="150" G="200" B="255" />
                        <FirstColor A="255" R="150" G="200" B="255" />
                        <EndColor A="255" R="255" G="255" B="255" />
                        <ColorVector ScaleY="1.0000" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="Panel_heroInfo" CanEdit="False" ActionTag="-895315741" Tag="83" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" RightMargin="409.0000" TopMargin="10.0000" BottomMargin="10.0000" TouchEnable="True" BackColorAlpha="102" ColorAngle="90.0000" ctype="PanelObjectData">
                        <Size X="271.0000" Y="380.0000" />
                        <Children>
                          <AbstractNodeData Name="Image_heroShow" ActionTag="191635954" Tag="85" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="17.5000" RightMargin="17.5000" TopMargin="-20.7000" BottomMargin="237.7000" Scale9Width="236" Scale9Height="163" ctype="ImageViewObjectData">
                            <Size X="236.0000" Y="163.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="135.5000" Y="319.2000" />
                            <Scale ScaleX="0.7900" ScaleY="0.7900" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.8400" />
                            <PreSize X="0.9440" Y="0.4289" />
                            <FileData Type="Normal" Path="herostrengthenscene/es_herobg.png" Plist="" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="Panel_heroEquip" CanEdit="False" ActionTag="-1277882029" Tag="86" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="25.5000" RightMargin="25.5000" TopMargin="124.5840" BottomMargin="5.4160" TouchEnable="True" BackColorAlpha="102" ColorAngle="90.0000" ctype="PanelObjectData">
                            <Size X="220.0000" Y="250.0000" />
                            <Children>
                              <AbstractNodeData Name="Image_equip1" ActionTag="941605790" Tag="87" IconVisible="False" LeftMargin="19.9704" RightMargin="125.0296" TopMargin="4.3994" BottomMargin="168.6006" Scale9Width="75" Scale9Height="77" ctype="ImageViewObjectData">
                                <Size X="75.0000" Y="77.0000" />
                                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                                <Position X="57.4704" Y="207.1006" />
                                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                                <CColor A="255" R="255" G="255" B="255" />
                                <PrePosition X="0.2612" Y="0.8284" />
                                <PreSize X="0.3409" Y="0.3500" />
                                <FileData Type="Normal" Path="herostrengthenscene/es_equipbg.png" Plist="" />
                              </AbstractNodeData>
                              <AbstractNodeData Name="Image_equip2" ActionTag="-312100717" Tag="88" IconVisible="False" LeftMargin="19.9703" RightMargin="125.0297" TopMargin="86.0990" BottomMargin="86.9010" Scale9Width="75" Scale9Height="77" ctype="ImageViewObjectData">
                                <Size X="75.0000" Y="77.0000" />
                                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                                <Position X="57.4703" Y="125.4010" />
                                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                                <CColor A="255" R="255" G="255" B="255" />
                                <PrePosition X="0.2612" Y="0.5016" />
                                <PreSize X="0.3409" Y="0.3500" />
                                <FileData Type="Normal" Path="herostrengthenscene/es_equipbg.png" Plist="" />
                              </AbstractNodeData>
                              <AbstractNodeData Name="Image_equip3" ActionTag="1024335595" Tag="89" IconVisible="False" LeftMargin="19.9703" RightMargin="125.0297" TopMargin="166.7987" BottomMargin="6.2013" Scale9Width="75" Scale9Height="77" ctype="ImageViewObjectData">
                                <Size X="75.0000" Y="77.0000" />
                                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                                <Position X="57.4703" Y="44.7013" />
                                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                                <CColor A="255" R="255" G="255" B="255" />
                                <PrePosition X="0.2612" Y="0.1788" />
                                <PreSize X="0.3409" Y="0.3500" />
                                <FileData Type="Normal" Path="herostrengthenscene/es_equipbg.png" Plist="" />
                              </AbstractNodeData>
                              <AbstractNodeData Name="Image_equip4" ActionTag="-1200607851" Tag="90" IconVisible="False" LeftMargin="125.8268" RightMargin="19.1732" TopMargin="4.3994" BottomMargin="168.6006" Scale9Width="75" Scale9Height="77" ctype="ImageViewObjectData">
                                <Size X="75.0000" Y="77.0000" />
                                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                                <Position X="163.3268" Y="207.1006" />
                                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                                <CColor A="255" R="255" G="255" B="255" />
                                <PrePosition X="0.7424" Y="0.8284" />
                                <PreSize X="0.3409" Y="0.3500" />
                                <FileData Type="Normal" Path="herostrengthenscene/es_equipbg.png" Plist="" />
                              </AbstractNodeData>
                              <AbstractNodeData Name="Image_equip5" ActionTag="-1479797290" Tag="91" IconVisible="False" LeftMargin="125.8267" RightMargin="19.1733" TopMargin="86.0990" BottomMargin="86.9010" Scale9Width="75" Scale9Height="77" ctype="ImageViewObjectData">
                                <Size X="75.0000" Y="77.0000" />
                                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                                <Position X="163.3267" Y="125.4010" />
                                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                                <CColor A="255" R="255" G="255" B="255" />
                                <PrePosition X="0.7424" Y="0.5016" />
                                <PreSize X="0.3409" Y="0.3500" />
                                <FileData Type="Normal" Path="herostrengthenscene/es_equipbg.png" Plist="" />
                              </AbstractNodeData>
                              <AbstractNodeData Name="Image_equip6" ActionTag="-131407328" Tag="92" IconVisible="False" LeftMargin="125.8266" RightMargin="19.1734" TopMargin="166.7987" BottomMargin="6.2013" Scale9Width="75" Scale9Height="77" ctype="ImageViewObjectData">
                                <Size X="75.0000" Y="77.0000" />
                                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                                <Position X="163.3266" Y="44.7013" />
                                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                                <CColor A="255" R="255" G="255" B="255" />
                                <PrePosition X="0.7424" Y="0.1788" />
                                <PreSize X="0.3409" Y="0.3500" />
                                <FileData Type="Normal" Path="herostrengthenscene/es_equipbg.png" Plist="" />
                              </AbstractNodeData>
                            </Children>
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="135.5000" Y="130.4160" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.3432" />
                            <PreSize X="0.8118" Y="0.6579" />
                            <SingleColor A="255" R="150" G="200" B="255" />
                            <FirstColor A="255" R="150" G="200" B="255" />
                            <EndColor A="255" R="255" G="255" B="255" />
                            <ColorVector ScaleY="1.0000" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleY="0.5000" />
                        <Position Y="200.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition Y="0.5000" />
                        <PreSize X="0.3985" Y="0.9500" />
                        <SingleColor A="255" R="150" G="200" B="255" />
                        <FirstColor A="255" R="150" G="200" B="255" />
                        <EndColor A="255" R="255" G="255" B="255" />
                        <ColorVector ScaleY="1.0000" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="Panel_equipInfo" CanEdit="False" ActionTag="1871568091" Tag="84" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="260.0000" TopMargin="10.0000" BottomMargin="10.0000" TouchEnable="True" BackColorAlpha="102" ColorAngle="90.0000" ctype="PanelObjectData">
                        <Size X="420.0000" Y="380.0000" />
                        <Children>
                          <AbstractNodeData Name="Button_upgrade1" ActionTag="-337436054" Tag="94" IconVisible="False" LeftMargin="244.3085" RightMargin="27.6915" TopMargin="307.1472" BottomMargin="14.8528" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="118" Scale9Height="36" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                            <Size X="148.0000" Y="58.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="318.3085" Y="43.8528" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.7579" Y="0.1154" />
                            <PreSize X="0.3524" Y="0.1526" />
                            <TextColor A="255" R="65" G="65" B="70" />
                            <NormalFileData Type="Normal" Path="herostrengthenscene/es_upgrade.png" Plist="" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="Button_upgrade2" ActionTag="1065731963" Tag="95" IconVisible="False" LeftMargin="33.6192" RightMargin="239.3808" TopMargin="307.1472" BottomMargin="14.8528" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="117" Scale9Height="36" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                            <Size X="147.0000" Y="58.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="107.1192" Y="43.8528" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.2550" Y="0.1154" />
                            <PreSize X="0.3868" Y="0.1526" />
                            <TextColor A="255" R="65" G="65" B="70" />
                            <DisabledFileData Type="Default" Path="Default/Button_Disable.png" Plist="" />
                            <NormalFileData Type="Normal" Path="herostrengthenscene/es_onekeyupgrade.png" Plist="" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="Image_equipDesc" ActionTag="-150199329" Tag="96" IconVisible="False" LeftMargin="-7.3889" RightMargin="-10.6111" TopMargin="-11.1127" BottomMargin="165.1127" Scale9Width="438" Scale9Height="226" ctype="ImageViewObjectData">
                            <Size X="438.0000" Y="226.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="211.6111" Y="278.1127" />
                            <Scale ScaleX="0.8900" ScaleY="0.8900" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5038" Y="0.7319" />
                            <PreSize X="1.1526" Y="0.5947" />
                            <FileData Type="Normal" Path="herostrengthenscene/es_equipdescbg.png" Plist="" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="Image_material1" ActionTag="-252653247" Tag="97" IconVisible="False" LeftMargin="62.9557" RightMargin="282.0443" TopMargin="214.2173" BottomMargin="88.7827" Scale9Width="75" Scale9Height="77" ctype="ImageViewObjectData">
                            <Size X="75.0000" Y="77.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="100.4557" Y="127.2827" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.2392" Y="0.3350" />
                            <PreSize X="0.1974" Y="0.2026" />
                            <FileData Type="Normal" Path="herostrengthenscene/es_equipbg.png" Plist="" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="Image_material2" ActionTag="-2054805829" Tag="98" IconVisible="False" LeftMargin="175.2399" RightMargin="169.7601" TopMargin="215.4770" BottomMargin="87.5230" Scale9Width="75" Scale9Height="77" ctype="ImageViewObjectData">
                            <Size X="75.0000" Y="77.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="212.7399" Y="126.0230" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5065" Y="0.3316" />
                            <PreSize X="0.1974" Y="0.2026" />
                            <FileData Type="Normal" Path="herostrengthenscene/es_equipbg.png" Plist="" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="Image_material3" ActionTag="1404127328" Tag="99" IconVisible="False" LeftMargin="286.2663" RightMargin="58.7337" TopMargin="215.4770" BottomMargin="87.5230" Scale9Width="75" Scale9Height="77" ctype="ImageViewObjectData">
                            <Size X="75.0000" Y="77.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="323.7663" Y="126.0230" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.7709" Y="0.3316" />
                            <PreSize X="0.1974" Y="0.2026" />
                            <FileData Type="Normal" Path="herostrengthenscene/es_equipbg.png" Plist="" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleX="1.0000" ScaleY="0.5000" />
                        <Position X="680.0000" Y="200.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="1.0000" Y="0.5000" />
                        <PreSize X="0.6176" Y="0.9500" />
                        <SingleColor A="255" R="150" G="200" B="255" />
                        <FirstColor A="255" R="150" G="200" B="255" />
                        <EndColor A="255" R="255" G="255" B="255" />
                        <ColorVector ScaleY="1.0000" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint ScaleX="1.0000" ScaleY="0.5000" />
                    <Position X="808.0000" Y="200.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="1.0100" Y="0.5000" />
                    <PreSize X="0.8500" Y="1.0000" />
                    <SingleColor A="255" R="165" G="42" B="42" />
                    <FirstColor A="255" R="150" G="200" B="255" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" />
                <Position X="400.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" />
                <PreSize X="1.0000" Y="0.8000" />
                <SingleColor A="255" R="77" G="77" B="77" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="480.0000" Y="320.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.5000" />
            <PreSize X="0.8333" Y="0.7813" />
            <SingleColor A="255" R="229" G="229" B="229" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
        </Children>
      </ObjectData>
    </Content>
  </Content>
</GameProjectFile>